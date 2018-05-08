let express = require('express');
let socket = require('socket.io')

// App setup
let app = express();
let server = app.listen(3000, function(){
    console.log('listening for requests on port 3000,');
});

// Static files
app.use(express.static('public'));

//Socket SetUp
let io = socket(server);

io.on('connection', function(socket){
    console.log(`Connected to ${socket.id}`);
    socket.on('chat', function(data){
        console.log(data)
        io.sockets.emit('chat', data)
    });
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data)
    });
    socket.on('stop', function(data){
        if(!data){
            socket.broadcast.emit('stop', data)
        }
    })
    socket.on('joined', function(data){
        socket.broadcast.emit('joined', data)
    })
});
