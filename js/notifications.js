 var socket = io('http://ffh.cloudapp.net');
  socket.on('request', function (data) {
    console.log(data);
    socket.emit('myEvent', { my: 'data' });
  });