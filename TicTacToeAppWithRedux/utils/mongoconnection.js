const mongoose = require('mongoose');



const startDB = () => {
mongoose.connection('mongodb://localhost/tic-tac-toe');
mongoose.connection
  .once('open', () => console.log('open') )
  .on('error', (error) => {
    console.warn('Warning', error);
  });
}

module.exports = startDB;
