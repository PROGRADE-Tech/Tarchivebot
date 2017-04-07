sqlite3 = require('sqlite3').verbose();

module.exports.db;

module.exports = {
  
  connect: function(database) {
    // Use connect method to connect to the Server
    console.log(__filename + ':\tOpening SQLite3 database `' + database + '`...');
    this.db = new sqlite3.Database(database);
    tmpDb = this.db;
    this.db.serialize(function() {
      var stmt = tmpDb.prepare("INSERT INTO chat (name,api_key) VALUES (?,?)");
      for (var i = 0; i < 10; i++) {
        stmt.run("Ipsum " + i, "key" + i);
      }
      stmt.finalize();
    });
    this.db.close();
  },

  logMessage: function(message) {
    // TODO Log message
  }
}
