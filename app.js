const bot = require('./libs/botcommands')
const webserver = require('./libs/webserver')
const api = require('./libs/api')

if(process.argv.length > 2) {
	process.argv.forEach((val, index, array) => {
		switch(val) {
			case '--bot':
				bot.run('config/auth.json') // run bot to log chats
				break;
			case '--webserver':
				webserver.serve()	// serve the data
				api.serve()				// provide api
				break;
		}
	});
} else {
	// No specific arguments have been passed; run all scripts:
	bot.run('config/auth.json') // run bot to log chats
	webserver.serve()	// serve the data
	api.serve()				// provide api
}
