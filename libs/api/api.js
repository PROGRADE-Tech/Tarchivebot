const webserver = require('../webserver')
const apiBackend = require('./apibackend')

module.exports = {
	serve: function() {
		webserver.app.post('/api/recent', function(req, res) {
			const key = req.body.key
			const amount = req.body.amount
			apiBackend.fetchLatest(key, amount, (data) => {
				res.send(JSON.stringify(data))
			})
		})
	}
}
