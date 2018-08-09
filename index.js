var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var user;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){

  socket.on('new connection', function(userName){
    user = userName;
    console.log(user)
    console.log('User: '+ user + ' connected');
  });

  socket.on('disconnect', function(){
    console.log('User: '+ user + ' disconnected');
    io.emit('lost connection', user);
  });
});


io.on('connection', function(socket){
  socket.on('chat message', function(from, msg){
    io.emit('chat message', from, msg);
    console.log(from + ' sent: ' + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});














