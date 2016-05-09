//for HEROKU oe local env
var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
// http server for express app
var http = require('http').Server(app);

app.use(express.static(__dirname + '/public'));

http.listen(PORT, function(){
	console.log('Server started');
});