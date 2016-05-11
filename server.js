//for HEROKU oe local env
var PORT = process.env.PORT || 3000;
var moment = require('moment');
var express = require('express');
var app = express();
// http server for express app
var http = require('http').Server(app);
var io = require('socket.io')(http);


var clientInfo= {};

//for listening for events
io.on('connection',function(socket){
	var userData = clientInfo[socket.id];
	console.log('user connected via socket.io');

	socket.on('disconnect', function(){
		if (typeof userData !== 'undefined'){
			socket.leave(userData.room);
			io.to(userData.room).emit('message',{
				name: 'System',
				text: userData.name + ' has left',
				timestamp: moment().valueOf()
			});
			delete userData;
		}
	});

	socket.on('joinRoom', function(req){
		clientInfo[socket.id]=req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message',{
			name: 'System',
			text: req.name + ' has joned!',
			timestamp: moment().valueOf()
		})
	});

	socket.on('message', function(message){
		console.log('message received: '+message.text);
		//to send to every person include sender io.emit
		//to send message to every person exclude sender - socket.broadcast.emit
		message.timestamp = moment().valueOf();
		io.to(clientInfo[socket.id].room).emit('message', message);
	});

	socket.emit('message', {
		name: 'System',
		text: 'Welcome to the Talkaline chat application! Lets talk',
		timestamp : moment().valueOf()
	});
});

app.use(express.static(__dirname + '/public'));

http.listen(PORT, function(){
	console.log('Server started');
});