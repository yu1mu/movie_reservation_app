const socketio = require('socket.io');
const express = require('express');
const http = require('http');
const fs = require('fs');
const favicon = require('serve-favicon');
const path = require ('path');

var seats = [
	[ 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1],
	[ 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
	[ 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
	[ 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
	[ 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
	[ 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
	[ 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
	[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[ 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
	[ 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
	[ 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
	[ 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
];

const app = express();
const server = http.createServer(app);


app.use(favicon(path.join(__dirname,'public','movie.png')));
app.get('/', function (req, res, next) {
	fs.readFile('HTMLPage.html', function(err, data){
		res.send(data.toString());
	});
});

app.get('/seats', function(req, res, next) {
	res.send(seats);
});

server.listen(2468, function() {
	console.log('Go to http://localhost:2468');
})

var io = socketio.listen(server);
io.sockets.on('connection', function (socket) {
	socket.on('reserve', function (data){
		seats[data.y][data.x] = 2;
		io.sockets.emit('reserve', data);
	});
});