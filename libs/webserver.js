const express = require('express');
const path = require('path');

module.exports = {

	PORT: 3000,
	VIEWS: './views/pug',
	ENGINE: 'pug',
	app: express(),

	serve: function() {
		this.app.set('port', this.PORT);
		this.app.set('views', this.VIEWS);
		this.app.set('view engine', this.ENGINE);

		this.app.get('/', function(req, res) {
			res.render('index', { title: 'Tarchivebot', message: 'Welcome' });
		});

		var server = this.app.listen(this.app.get('port'), function() {
			var port = server.address().port;
			console.log('Serving static files from ./public to  localhost:' + port);
		});
	}

}
