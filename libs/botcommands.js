/**
 * File: commands.js
 * Contains Telegram-Bot routines
 */
const telegramBot = require('node-telegram-bot-api')
const jsonFile = require('jsonfile')

module.exports = {
  run: function(configFile) {
    if(configFile) {
      jsonfile.readFile(configFile, function(err, obj) {
        bot = new telegramBot(obj.token, { polling: true })

        bot.onText(/.*/, function(msg, match) {
          var chatId = msg.chat.id;
          var resp = match[0];
          // TODO
          // Log message
          // Insert into database
        })
      })
    }
  }
}
