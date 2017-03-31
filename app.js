const bot = require('./libs/botcommands')
const webserver = require('./libs/webserver')
const api = require('./libs/api')

// Part 1: run the telegram bot (and collect data)
bot.run()

// Part 2: serve the data
webserver.serve()

// Part 3: provide api
api.serve()
