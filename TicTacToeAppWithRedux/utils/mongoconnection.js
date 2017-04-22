const mongoose = require('mongoose');
const creds = require('../creds/creds');

const startDB = (database) => {
if(database === 'tic-tac-toe')
  mongoose.connect(`mongodb://${creds.user}:${creds.pwd}@localhost/${database}?authSource=${creds.authSource}`);
mongoose.connection
  .once('open', () => console.log('MongoDB Connected') )
  .on('error', (error) => {
    console.warn('Warning', error);
  });
}

module.exports = startDB;
