const sqlite3 = require('sqlite3')
const crypto = require('crypto')

module.exports.db

module.exports = {

  SALT_SIZE: 64,

  connect: function(database) {
    // Use connect method to connect to the Server
    console.log(__filename + ':\tOpening SQLite3 database `' + database + '`...');
    this.db = new sqlite3.Database(database);
    tmpDb = this.db;
    /*
    this.db.serialize(function() {
      var stmt = tmpDb.prepare("INSERT INTO chat (name,api_key) VALUES (?,?)");
      for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i, "key" + i);
      }
      stmt.finalize();
    });
    this.db.close();
    */
  },

  generateApiKey: function(str) {
      var api = {}
      api.salt = crypto.randomBytes(this.SALT_SIZE).toString('hex')
      const input = str + api.salt
      api.key = crypto.createHash('sha256')
                            .update(input)
                            .digest('base64')
      return api
  },

  /**
   * Log chat name and generate salted API key
   */
  logChat: function(name) {
    var chatId = -1
    if(name !== undefined) {
      const apiData = this.generateApiKey(name)
      var db = this.db
      var apiKey = apiData.key
      var apiKeySalt = apiData.salt

      // Log the chat id and generate an API key
      this.db.serialize(function() {
        var stmt = db.prepare("INSERT OR IGNORE INTO chat (id, name, api_key, api_key_salt) VALUES (null,?,?,?)")
        stmt.run(name, apiKey, apiKeySalt)
        stmt.finalize()
      })

      // Retrieve the chat primary key the message was sent from
      this.db.each("SELECT rowid AS id FROM chat WHERE name = ?", name, function(err, row) {
        chatId = row.id
      })
    }
    return chatId
  },

  logUserType: function(name) {
    var typeId = -1
    if(name !== undefined) {
      var db = this.db

      this.db.serialize(function() {
        var stmt = db.prepare("INSERT OR IGNORE INTO user_type (id, name) VALUES (null,?)")
        stmt.run(name)
        stmt.finalize()
      })

      this.db.each("SELECT rowid AS id FROM user_type WHERE name = ?", name, function(err, row) {
        typeId = row.id
      })
    }
    return typeId
  },

  logMessage: function(msg) {
    const chatDbId = this.logChat(msg.chat.id)
    const userTypeDbId = this.logUserType(msg.chat.type)
    // TODO Log message
    // TODO Log user
    // TODO Log message type
  }
}
