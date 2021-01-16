var socket = io();
var socketid;
var sendbtn = document.getElementById("send");
var username = document.getElementById("username");
var message = document.getElementById("message");
var dialog = document.getElementById("dialog");
var typee = document.getElementById('typing');
sendbtn.addEventListener("click",function(){
    if(username.value=='' || message.value=='' ){
        return false;
    }
    var data = {
        'sid':socketid,
        'username':username.value,
        'message':message.value
    };
    ;
    
    socket.emit('chat',data);

});

socket.on("connect",function(){
    socketid = socket.io.engine.id;
});



socket.on("chat",function(data){
    typee.innerHTML = '';
    // check if self
    if( data.sid!=socketid ){
        dialog.insertAdjacentHTML("beforeend","<p class=' pop right'>"+data.username+' : '+data.message+"</p>");
        
    }else{
        dialog.insertAdjacentHTML("beforeend","<p class='pop left'>"+data.username+' : '+data.message+"</p>");
        
    }
    
    scroll();
});

socket.on("typing",function(name){
    typee.innerHTML = '<em class="type" >'+name+' is typing...'+'</em>';
});

message.addEventListener('keyup',function(){
    socket.emit("typing",username.value);
});

function scroll(){
    dialog.scrollTop = dialog.scrollHeight;
}