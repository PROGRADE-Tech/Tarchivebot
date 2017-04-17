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
  }
}
