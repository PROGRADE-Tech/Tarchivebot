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
        logger.connect(obj.db_host, obj.db_user, obj.db_name, obj.db_pass)
        logger.init()

        // Log message
        bot.onText(/.*/, function(msg, match) {
          var chatId = msg.chat.id
          logger.logMessage(match[0])
        })

        // Greeting
        bot.onText(/\/start/, function(msg, match) {
          var chatId = msg.chat.id
          bot.sendMessage(chatId,
            'Hello there! I am *Tarchivebot*. I log all your messages and calculate statistics.\nSelfhost it yourself for full privacy: https://github.com/fuerbringer/Tarchivebot',
            { "parse_mode": "Markdown" }
          )
        })

        // Return user token
        bot.onText(/\/token/, function(msg, match) {
          var chatId = msg.chat.id
          // Provide SHA-256 token to for this chat (NOT the telegram token)
        })
      })
    }
  }
}
