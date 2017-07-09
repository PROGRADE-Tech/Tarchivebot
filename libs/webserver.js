const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const sassMiddleware = require('node-sass-middleware')
const appDir = path.dirname(require.main.filename)

module.exports = {
	PORT: 3000,
	VIEWS: './views/pug',
	ENGINE: 'pug',
	app: express(),

	serve: function(config) {
		this.app.set('port', this.PORT)
		this.app.set('views', this.VIEWS)
		this.app.set('view engine', this.ENGINE)

		this.app.use(sassMiddleware({
			src: appDir + '/views/scss',
			dest: appDir + '/public/css',
			prefix: '/css',
			indentedSyntax: false,
			debug: true,
		}))

		// Serve files other than compiled pug markup:
		this.app.use(express.static(path.join(__dirname, '../public')))

		this.app.get('/', function(req, res) {
			res.render('index', {
				title: config['frontend'].title,
				message: config['frontend'].message,
				botUsername: config['frontend'].botUsername,
			})
		})

		// Body parser for API
		this.app.use(bodyParser.json())

		var server = this.app.listen(this.app.get('port'), function() {
			var port = server.address().port
			console.log(__filename +
				':\tServing static files from ./public to  localhost:' + port)
		})
	}
}
