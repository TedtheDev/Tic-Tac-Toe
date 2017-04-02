const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/tic-tac-toe_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', (error) => {
      console.warn('Warning', error);
    });
})

beforeEach((done) => {
  const { players, chatsystem } = mongoose.connection.collections;

  players.drop(() => {
    chatsystem.drop(() => {
      done();
    });
  });

});
