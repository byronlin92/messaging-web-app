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
    io.emit('new connection', user);  //io.emit to broadcast to client

  });

  socket.on('disconnect', function(){
    if (user != null) {
      console.log('User: '+ user + ' disconnected');
      io.emit('lost connection', user);
      user = null;
    }
  });

  socket.on('chat message', function(from, msg){
    io.emit('chat message', from, msg);
    console.log(from + ' sent: ' + msg);
  });


});


http.listen(process.env.PORT||3000, function(){
  console.log('listening on port');
});














