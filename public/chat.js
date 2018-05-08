// Make connection
let socket = io.connect('http://localhost:3000');

//Query DOM
let message = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');
let joined = document.getElementById('joined');

//Emit Events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
    
});
message.addEventListener('blur', function(){
    socket.emit('stop', message.value.length);
});

handle.addEventListener('blur', function(){
    socket.emit('joined', handle.value)
});

//Listen for events
socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    feedback.innerHTML = ''
    message.value = ''
});
socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>'
})
socket.on('stop', function(data){
    feedback.innerHTML = ''
})

socket.on('joined', function(data){
    joined.innerHTML += '<p><strong>' + data + '</strong> joined the chat</p>'
})