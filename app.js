const bot = require('./libs/botcommands')
const webserver = require('./libs/webserver')
const api = require('./libs/api/api')
const db = require('./libs/db')

const configFile = 'config/config.json'

// Global DB connection
db.connect(configFile, () => {
	if (process.argv.length > 2) {
		process.argv.forEach((val, index, array) => {
			switch (val) {
				case '--bot':
					bot.run(configFile) // run bot to log chats
					break;
				case '--webserver':
					webserver.serve(configFile) // serve the data
					api.serve() // provide api
					break;
			}
		})
	} else {
		// No specific arguments have been passed; run all scripts:
		bot.run(configFile) // run bot to log chats
		webserver.serve(configFile) // serve the data
		api.serve() // provide api
	}
})
