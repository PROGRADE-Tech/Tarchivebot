const db = require('../db');

module.exports = {

  fetchLatest: function(key, amount, callback) {
    var data = []
    db.conn.all(
      "SELECT message.id, message.data, message.timestamp, \
        chat.name AS chat_name, user.name AS user_name, \
        user.first_name AS first_name, user.last_name AS last_name, \
        message_type.name AS message_type \
      FROM message \
      JOIN chat ON message.chat_id=chat.id \
      JOIN user ON message.user_id=user.id \
      JOIN message_type ON message.message_type_id=message_type.id \
      WHERE chat_id=(SELECT id FROM chat WHERE api_key=?) \
      ORDER BY timestamp DESC \
      LIMIT ?", key, amount, function(err, rows) {
      rows.forEach(function(row) {
        data.push(row)
      })
      callback(data)
    })
  },

  searchForMessages: function(key, amount, str, callback) {
    var data = []
    db.conn.all(
      "SELECT message.id, message.data, message.timestamp, \
        chat.name AS chat_name, user.name AS user_name, \
        user.first_name AS first_name, user.last_name AS last_name, \
        message_type.name AS message_type \
      FROM message \
      JOIN chat ON message.chat_id=chat.id \
      JOIN user ON message.user_id=user.id \
      JOIN message_type ON message.message_type_id=message_type.id \
      WHERE chat_id=(SELECT id FROM chat WHERE api_key=?) AND \
        (message.data LIKE ? OR \
        message.data LIKE ? OR \
        message.data LIKE ? OR \
        message.data LIKE ?) \
      ORDER BY timestamp DESC \
      LIMIT ?", key, str, '%'+str, str+'%', '%'+str+'%', amount, function(err, rows) {
        rows.forEach(function(row) {
          data.push(row)
        })
        callback(data)
      })
    },

    validateApiKey: function(key, callback) {
      db.conn.all("SELECT rowid FROM chat WHERE name != '' AND api_key=? LIMIT 1", key, function(err, row) {
        var status = false;
        if(row.length >= 1) {
          status = true;
        }
        callback([{'status': status}]);
      })
    }
}
