const sqlite3 = require('sqlite3').verbose()
const crypto = require('crypto')

module.exports.db

module.exports = {

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

  /**
   * Log chat name and generate salted API key
   */
  logChat: function(name) {
    if(name !== undefined) {
      const salt = crypto.randomBytes(256).toString('hex');
      console.log('salt: ' + hash)
      console.log('name: ' + name)
    }
    return 1
  },

  logMessage: function(msg) {
    // TODO Log message
    const chatDbId = this.logChat(msg.chat.id)
  }
}
