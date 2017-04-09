const sqlite3 = require('sqlite3')
const crypto = require('crypto')

module.exports.db

module.exports = {

  SALT_SIZE: 64,

  connect: function(database) {
    // Use connect method to connect to the Server
    console.log(__filename + ':\tOpening SQLite3 database `' + database + '`...');
    this.db = new sqlite3.Database(database);
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
  logChat: function(name, callback) {
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
        // Retrieve the chat primary key the message was sent from
        db.each("SELECT rowid AS id FROM chat WHERE name = ?", name, function(err, row) {
          callback(row.id)
        })
      })
    }
  },

  logUserType: function(name, callback) {
    var typeId = -1
    if(name !== undefined) {
      var db = this.db

      this.db.serialize(function() {
        var stmt = db.prepare("INSERT OR IGNORE INTO user_type (id, name) VALUES (null,?)")
        stmt.run(name)
        stmt.finalize()
        db.each("SELECT rowid AS id FROM user_type WHERE name = ?", name, function(err, row) {
          callback(row.id)
        })
      })
    }
  },

  logUser: function(name, firstName, lastName, userTypeId, callback) {
    var userId = -1
    if(name !== undefined) {
      var db = this.db
      this.db.serialize(function() {
        var stmt = db.prepare("INSERT OR IGNORE INTO user (id, name, first_name, last_name, user_type_id) VALUES (null,?,?,?,?)")
        stmt.run(name, firstName, lastName, userTypeId)
        stmt.finalize()
        db.each("SELECT rowid AS id FROM user WHERE name = ?", name, function(err, row) {
          callback(row.id)
        })
      })
    }
  },

  logMessageType: function(name, callback) {
    var messageTypeId = -1
    if(name !== undefined) {
      var db = this.db
      this.db.serialize(function() {
        var stmt = db.prepare("INSERT OR IGNORE INTO message_type (id, name) VALUES (null,?)")
        stmt.run(name)
        stmt.finalize()
        db.each("SELECT rowid AS id FROM message_type WHERE name = ?", name, function(err, row) {
          callback(row.id)
        })
      })
    }
  },

  logMessageData: function(data, chatId, userId, messageTypeId, callback) {
    var messageId = -1
    if(data !== undefined) {
      var db = this.db
      this.db.serialize(function() {
        var stmt = db.prepare("INSERT INTO message (id, data, chat_id, user_id, message_type_id) VALUES (null,?,?,?,?)")
        stmt.run(data, chatId, userId, messageTypeId)
        stmt.finalize()
        db.each("SELECT last_insert_rowid() as id", function(err, row) {
          callback(row.id)
        })
      })
    }
  },

  logMessage: function(msg) {
    this.logChat(msg.chat.id, (chatId) => {
      this.logUserType(msg.from.id, (typeId) => {
        this.logUser(msg.from.username, msg.from.first_name, msg.from.last_name, typeId, (userId) => {
          this.logMessageType(msg.chat.type, (messageTypeId) => {
            this.logMessageData(msg.text, chatId, userId, messageTypeId, (messageId) => {
              // Message at id `messageId` has been logged
            })
          })
        })
      })
    })
  }
}
