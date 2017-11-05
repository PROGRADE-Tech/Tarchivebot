const db = require('../db')

module.exports = {

  fetchLatest: function (key, amount, callback) {
    var data = []

    if (amount === null || isNaN(amount)) {
      amount = 1000
    }

    if (key !== null) {
      const query =
        `SELECT message.id, message.data, message.timestamp,
          chat.name AS chat_name, user.name AS user_name,
          user.first_name AS first_name, user.last_name AS last_name,
          message_type.name AS message_type
        FROM message
        JOIN chat ON message.chat_id=chat.id
        JOIN user ON message.user_id=user.id
        JOIN message_type ON message.message_type_id=message_type.id
        WHERE chat_id=(SELECT id FROM chat WHERE api_key=?)
        ORDER BY timestamp DESC`
      if (amount && !isNaN(amount)) {
        // An amount limit was specified
        const queryLimit = query + ' LIMIT ?'
        db.conn.all(queryLimit, key, amount, function (err, rows) {
          if (err) {
            console.log(err)
          }
          rows.forEach(function (row) {
            data.push(row)
          })
          callback(data)
        })
      } else {
        // Return all the messeges we've got
        db.conn.all(query, key, function (err, rows) {
          if (err) {
            console.log(err)
          }
          rows.forEach(function (row) {
            data.push(row)
          })
          callback(data)
        })
      }
    }
  },

  searchForMessages: function (key, amount, str, callback) {
    var data = []

    if (amount === null || isNaN(amount)) {
      amount = 1000
    }

    if (key !== null && str && (typeof str === 'string' || str instanceof String)) {
      const query =
        `SELECT message.id, message.data, message.timestamp,
          chat.name AS chat_name, user.name AS user_name,
          user.first_name AS first_name, user.last_name AS last_name,
          message_type.name AS message_type
        FROM message
        JOIN chat ON message.chat_id=chat.id
        JOIN user ON message.user_id=user.id
        JOIN message_type ON message.message_type_id=message_type.id
        WHERE chat_id=(SELECT id FROM chat WHERE api_key=?) AND
          (message.data LIKE ? OR message.data LIKE ? OR
          message.data LIKE ? OR  message.data LIKE ?)
        ORDER BY timestamp DESC`
      if (amount && !isNaN(amount)) {
        // An amount was specified
        const queryLimit = query + ' LIMIT ?'
        db.conn.all(queryLimit, key, str, '%' + str, str + '%', '%' + str +
          '%', amount,
          function (err, rows) {
            if (err) {
              console.log(err)
            }
            rows.forEach(function (row) {
              data.push(row)
            })
            callback(data)
          })
      } else {
        db.conn.all(query, key, str, '%' + str, str + '%', '%' + str + '%',
          function (err, rows) {
            if (err) {
              console.log(err)
            }
            rows.forEach(function (row) {
              data.push(row)
            })
            callback(data)
          })
      }
    } else {
      callback(data)
    }
  },

  validateApiKey: function (key, callback) {
    if (key !== null) {
      const query =
        `SELECT rowid
        FROM chat
        WHERE name != '' AND api_key=?
        LIMIT 1`

      db.conn.all(query, key, function (err, row) {
        if (err) {
          console.log(err)
        }
        var status = false
        if (row.length >= 1) {
          status = true
        }
        // eslint-disable-next-line
        callback({
          'status': status
        })
      })
    } else {
      // eslint-disable-next-line
      callback([])
    }
  },

  wordCounts: function (key, head, order, callback) {
    var data = {}
    var error = ''

    if (head === null || isNaN(head)) {
      head = 1000 // Show the top 1000 in whatever order was defined
    }

    if (order === null || order === undefined) {
      order = 'desc' // Most used to least used by default
    }

    if (key !== null) {
      // Fetch all messages
      const query = `SELECT data, timestamp FROM message
        JOIN chat ON message.chat_id=chat.id
        WHERE chat_id=(SELECT id FROM chat WHERE api_key=?) AND data != ''`
      db.conn.all(query, key, function (err, rows) {
        if (err) {
          error = err
          console.log(err)
          callback(error, [])
          return
        }

        if (rows === undefined || !rows.length) {
          error = 'SQLite3 query returned zero rows'
          callback(error, [])
          return
        }

        var wordPool = ''
        for (var it = 0; it < rows.length; it++) {
          // Append current message to word pool
          wordPool += rows[it].data + ' '
        }

        // Some preparations
        wordPool = wordPool.replace(/\n|\.|,|:|;/g, ' ')

        var wordPoolArray = wordPool.split(' ')

        // Merge unique words into counted pairs
        for (var at = 0; at < wordPoolArray.length; at++) {
          if (wordPoolArray[at]) {
            data[wordPoolArray[at]] = (data[wordPoolArray[at]] || 0) + 1
          }
        }

        // Convert {} to []
        var result = Object.keys(data).map(function (key) {
          if (key && data[key] && key !== '' && data[key] !== '') {
            return [key, data[key]]
          }
        })

        result.sort((a, b) => {
          if (order === 'asc') {
            return a[Object.keys(a)[1]] - b[Object.keys(b)[1]]
          } else if (order === 'desc') {
            return b[Object.keys(b)[1]] - a[Object.keys(a)[1]]
          }
        })

        // Limit only to top N
        var top = []
        for (var tt = 0; tt < head; tt++) {
          top.push(result[tt])
        }

        callback(null, top)
      })
    } else {
      error = 'Missing API key'
      callback(error, [])
    }
  }
}
