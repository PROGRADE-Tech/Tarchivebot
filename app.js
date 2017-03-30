const express = require('express');
const path = require('path');

// Constants
const PORT = 3000;

// App
const app = express();


app.set('port', PORT);

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(app.get('port'), function() {
	var port = server.address().port;
	console.log('Serving static files from ./public to  localhost:' + port);
});
