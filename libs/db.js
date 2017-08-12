const sqlite3 = require('sqlite3')

module.exports = {
  connect: function (config, next) {
    // eslint-disable-next-line no-path-concat
    console.log(__filename + ':\tOpening SQLite3 database `' + config.dbName +
      '`...')
    module.exports.conn = new sqlite3.Database(config.dbName)

    // Perform data with database connection:
    next()
  }
}
