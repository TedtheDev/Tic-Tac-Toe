//const express = require('express')
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('file-system');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const startDB = require('./utils/mongoconnection');


mongoose.Promise = global.Promise;

if(process.env.NODE_ENV === 'test') {
  startDB('tic-tac-toe_test');
}
else {
  startDB('tic-tac-toe');
}

if(process.env.NODE_ENV === 'production') {
  const accessLogStream = fs.createWriteStream(__dirname + '/logs/' + "access.log", {flags: 'a'});
  app.use(morgan("common", {stream: accessLogStream}));
} else {
  app.use(morgan("common")); //log to console on development
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

app.get('/dist/bundle.css', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/dist/bundle.css'));
});

app.get('/dist/bundle.js', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/dist/bundle.js'));
});

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/favicon.ico'));
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/index.html'));
});

io.on('connection', (socket) => {
  console.log('user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (data) => {
    console.log(data);
  })

})

const port = (process.env.NODE_ENV === "production") ? 8080 : 3050;
server.listen(port, () => {
  console.log('Listening on port 3050');
});

module.exports = app;
