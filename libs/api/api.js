const webserver = require('../webserver')

module.exports = {
	serve: function() {
		webserver.app.post('/api/wordtable', function(req, res) {

			res.send(req.body.key)
		})
	}
}
