const mongoose = require('mongoose');

const startDB = (database) => {
mongoose.connect(`mongodb://localhost/${database}`);
mongoose.connection
  .once('open', () => console.log('MongoDB Connected') )
  .on('error', (error) => {
    console.warn('Warning', error);
  });
}

module.exports = startDB;
