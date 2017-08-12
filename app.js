const jsonFile = require('jsonfile')
const bot = require('./libs/botcommands')
const webserver = require('./libs/webserver')
const api = require('./libs/api/api')
const db = require('./libs/db')

const configFile = 'config/config.json'

// Global DB connection
jsonFile.readFile(configFile, function (err, config) {
  console.log(err)
  db.connect(config, () => {
    if (process.argv.length > 2) {
      process.argv.forEach((val, index, array) => {
        switch (val) {
          case '--bot':
            bot.run(config) // run bot to log chats
            break
          case '--webserver':
            webserver.serve(config) // serve the data
            api.serve(config) // provide api
            break
        }
      })
    } else {
      // No specific arguments have been passed; run all scripts:
      bot.run(config) // run bot to log chats
      webserver.serve(config) // serve the data
      api.serve() // provide api
    }
  })
})
