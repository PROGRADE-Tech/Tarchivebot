const sqlite3 = require('sqlite3')
const jsonFile = require('jsonfile')

module.exports.conn

module.exports = {
  connect: function(configFile, next) {
    if(configFile) {
      var that = this
      jsonFile.readFile(configFile, function(err, obj) {
        console.log(__filename + ':\tOpening SQLite3 database `' + obj.db_name + '`...')
        that.conn = new sqlite3.Database(obj.db_name)

        // Perform data with database connection:
        next()
      })
    } else {
      console.log(__filename + ':\tCould not read config file')
    }
  }
}
