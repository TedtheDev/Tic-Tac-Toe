const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const app = express();
const startDB = require('./utils/mongoconnection');

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV === 'test') {
  startDB('tic-tac-toe_test');
}
else {
  startDB('tic-tac-toe');
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);

/* not using sessions but json web tokens
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false'
}))
*/

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
