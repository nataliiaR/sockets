//for HEROKU oe local env
var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app = express();
// http server for express app
var http = require('http').Server(app);
var io = require('socket.io')(http);

//for listening for events
io.on('connection',function(socket){
	console.log('user connected via socket.io');
	socket.on('message', function(message){
		console.log('message received: '+message.text);
		//to send to every person include sender io.emit
		//to send message to every person exclude sender - socket.broadcast.emit
		message.timestamp = moment().valueOf();
		io.emit('message', message);
	});

	socket.emit('message', {
		text: 'Welcome to the Talkaline chat application! Lets talk',
		timestamp : moment().valueOf()
	});
});

app.use(express.static(__dirname + '/public'));

http.listen(PORT, function(){
	console.log('Server started');
});