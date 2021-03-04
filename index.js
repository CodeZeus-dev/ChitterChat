const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  const username = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg, username);
  });
  socket.on('disconnect', () => {
    io.emit('user disconnected');
  });
});

http.listen(3000, () => { 
  console.log('Listening on *:3000');
});