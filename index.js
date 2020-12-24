// prepare and launch socket.io server
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
var behavior = require('./behaviors');
var functions = require('./functions');
var output = {};
var SocketCount = {"Current": 0, "All-time": 0};

// initialization: on start
let local = {};
output.Get_URL = behavior.Get_URL();
io.emit(chat,output["Get_URL"].URL);

io.on('connection', function(socket) {
  SocketCount.Current++; SocketCount["All-Time"]++;
  let local = {};
  output.Get_URL = behavior.Get_URL();
  output.Emit_Event = behavior.Emit_Event("chat",output["Get_URL"].URL,"All Clients","Socket ID");
  
  socket.on('disconnect', function(reason) {
    SocketCount.Current--;
  });
  
  socket.on('console input', function(input) {
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});