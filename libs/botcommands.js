/**
 * File: commands.js
 * Contains Telegram-Bot routines
 */
const telegramBot = require('node-telegram-bot-api')
const jsonFile = require('jsonfile')
const logger = require('./logger')

module.exports = {

  run: function(configFile) {
    if(configFile) {
      jsonFile.readFile(configFile, function(err, obj) {
        bot = new telegramBot(obj.token, { polling: true })
        logger.connect(obj.db_name)

        // Log message
        bot.onText(/.*/, function(msg, match) {
          //console.log(msg)
          logger.logMessage(msg)
        })

        // Greeting
        bot.onText(/\/start/, function(msg, match) {
          var chatId = msg.chat.id
          bot.sendMessage(chatId,
            'Hello there! I am *Tarchivebot*. I log all your messages and calculate statistics.\nSelfhost it yourself for full privacy: https://github.com/fuerbringer/Tarchivebot',
            { "parse_mode": "Markdown" }
          )
        })

        // Return user apikey
        bot.onText(/\/apikey/, function(msg, match) {
          // TODO move to apibackend.js
          var db = logger.db
          logger.db.serialize(function() {
            db.each("SELECT api_key FROM chat WHERE name = ?", msg.chat.id, function(err, row) {
              bot.sendMessage(msg.chat.id, 'Your API-Key:\n`' + row.api_key + '`', { 'parse_mode': 'Markdown'})
            })
          })
        })
      })
    }
  }
}
