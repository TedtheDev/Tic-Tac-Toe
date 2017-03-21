'use strict';

//setup requir
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const mongo = require('./mongoDB/fetchChatMessages');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set port and ip address with Openshift or set default ones
const server_port = process.env.OPENSHIFT_NODEJS_PORT || 8888;
const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

//set express to use static html
app.use(express.static(path.join(__dirname, '/dist')));

//render index on /
app.get('/', function( req, res) {
  res.render(__dirname+ 'dist/index.html');
});

app.get('/messages', function(req, res) {
  let messages = mongo.fetchChatMessages;
  res.json(messages);
})
//listening
app.listen(server_port, server_ip_address, function() {
  console.log('Listening on ' + server_ip_address + ' on port ' + server_port);
});
