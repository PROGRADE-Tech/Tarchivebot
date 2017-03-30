const express = require('express');
const path = require('path');

module.exports = {

	PORT: 3000,
	app: express(),

	serve: function() {
		this.app.set('port', this.PORT);

		this.app.use(express.static(path.join(__dirname, '../public')));

		var server = this.app.listen(this.app.get('port'), function() {
			var port = server.address().port;
			console.log('Serving static files from ./public to  localhost:' + port);
		});
	}

}
