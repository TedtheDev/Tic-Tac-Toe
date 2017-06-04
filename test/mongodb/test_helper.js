const mongoose = require('mongoose');
const creds = require('../../creds/creds')
mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect(`mongodb://${creds.testcreds.user}:${creds.testcreds.pwd}@localhost/${creds.testcreds.database}?authSource=${creds.testcreds.authSource}`);
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
