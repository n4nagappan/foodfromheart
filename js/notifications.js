 var socket = io('http://ffh.cloudapp.net');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('myEvent', { my: 'data' });
  });