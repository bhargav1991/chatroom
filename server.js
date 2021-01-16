var express = require("express");
var sockets = require("socket.io");
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static('public'));


var server = app.listen(port,function(){
    console.log("Listening at port "+port);
});
var io = sockets(server);
io.on('connection',function(socket){
    console.log(socket.id+" connected");
    socket.on("chat",function(data){
        io.emit("chat",data);
    });
    socket.on("typing",function(name){
        socket.broadcast.emit("typing",name);
    });
    socket.on("disconnect",function(){
        console.log(socket.id+" Disconnected");
    });
});