const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

module.exports = {

  connect: function(host, user, database, password) {
    // Use connect method to connect to the Server
    MongoClient.connect(host, function(err, db) {
      assert.equal(null, err)
      console.log(__filename + ': Mongoose Database connection has beeen established')
    })
  },

  init: function() {
  },

  logMessage: function() {

  }
}
