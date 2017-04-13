const db = require('../db');

module.exports = {

  fetchLatest: function(key, amount, callback) {
    var data = []
    console.log(key);
    console.log(amount);
    db.conn.all(
      "SELECT message.id, message.data, message.timestamp, chat.name AS chat_name, user.name AS user_name, message_type.name AS message_type FROM message \
      JOIN chat ON message.chat_id=chat.id \
      JOIN user ON message.user_id=user.id \
      JOIN message_type ON message.message_type_id=message_type.id \
      WHERE chat_id=(SELECT id FROM chat WHERE api_key=?) \
      ORDER BY timestamp DESC \
      LIMIT ?", key, amount, function(err, rows) {
        console.log(err);
      rows.forEach(function(row) {
        console.log(row)
      })
    })
    callback('hi from api backend')
  }
}
