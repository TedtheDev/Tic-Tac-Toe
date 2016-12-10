//setup requir
const express = require('express');
const app = express();
const path = require('path');

//set port and ip address with Openshift or set default ones
const server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

//set express to use static html
app.use(express.static(path.join(__dirname, '/dist')));

//render index on /
app.get('/', function( req, res) {
  res.render(__dirname+ 'dist/index.html');
});

//listening
app.listen(server_port, server_ip_address, function() {
  console.log('Listening on ' + server_ip_address + ' on port ' + server_port);
});
