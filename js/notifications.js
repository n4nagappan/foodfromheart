var dataRequests; 
var socket = io('http://ffh.cloudapp.net');
  socket.on('request', function (data) {
    console.log(data);
    $("#notification").text(data.length);
      localStorage.setItem("dataRequests", data);
    //socket.emit('accept', { acceptData: 'TestData' });
  });