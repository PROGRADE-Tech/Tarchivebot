const webserver = require('./webserver');

module.exports = {
	serve: function() {
		webserver.app.get('/:id', function(req, res) {
			res.end('OK ' + req.params.id);
		});
	}
}
