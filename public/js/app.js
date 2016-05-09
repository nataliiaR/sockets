var socket = io();

socket.on('connect', function(){
	console.log('connected to the socket/io server');
})