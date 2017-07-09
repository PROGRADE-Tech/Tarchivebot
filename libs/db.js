const sqlite3 = require('sqlite3')
const jsonFile = require('jsonfile')

module.exports.conn

module.exports = {
  connect: function(config, next) {
    console.log(__filename + ':\tOpening SQLite3 database `' + config.dbName +
      '`...')
    this.conn = new sqlite3.Database(config.dbName)

    // Perform data with database connection:
    next()
  }
}
