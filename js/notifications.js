 var socket = io('http://ffh.cloudapp.net');
  socket.on('request', function (data) {
    console.log(data);
    $("#notification").text(data.length);
    //socket.emit('accept', { acceptData: 'TestData' });
  });