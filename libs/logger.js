const sqlite3 = require('sqlite3').verbose()
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
      const salt = crypto.randomBytes(this.SALT_SIZE).toString('hex')
      const input = str + salt;
      const apiKey = crypto.createHash('sha256')
                            .update(input)
                            .digest('base64');
      return apiKey;
  },

  /**
   * Log chat name and generate salted API key
   */
  logChat: function(name) {
    if(name !== undefined) {
      const apiKey = this.generateApiKey(name)
      // TODO insert or ignore chat
      console.log('key: ' + apiKey)
    }
    return 1
  },

  logMessage: function(msg) {
    // TODO Log message
    const chatDbId = this.logChat(msg.chat.id)
  }
}
