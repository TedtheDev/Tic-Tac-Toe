const assert = require('assert');
const Player = require('../../models/player');
const ChatSystem = require('../../models/chatsystem');

describe('Removing a Player and Message', () => {
  let playerOne;
  let message;

  beforeEach((done) => {
    playerOne = new Player({
      name: 'Tyler',
      email: 'test@test.com',
      avatar: 'http://i.imgur.com/OqQj7v4.jpg',
      gamesWon: 2,
      gamesLost: 3,
      gamesDrawn: 1
    });

    message = new ChatSystem({
      user: 'Tyler',
      message: 'This is a message for mocha testing'
    });

    Promise.all([playerOne.save(), message.save()])
      .then(() => done())
  });

  it('can remove a player from model instance', (done) => {
    playerOne.remove()
      .then(() => Player.findOne({ name: 'Tyler' }))
      .then((player) => {
        assert(player === null);
        done();
      })
  });

  it('can remove a player from class method', (done) => {
    Player.remove({ name: 'Tyler' })
      .then(() => Player.findOne({ name: 'Tyler'}))
      .then((player) => {
        assert(player === null);
        done();
      });
  });

  it('can remove a player by findByIdAndRemove', (done) => {
    Player.findByIdAndRemove({ _id: playerOne._id })
      .then(() => Player.findOne({ _id: playerOne._id }))
      .then((player) => {
        assert(player === null);
        done();
      });
  });

  it('can remove a message from model instance', (done) => {
    ChatSystem.remove()
      .then(() => ChatSystem.findOne({ user: 'Tyler' }))
      .then((message) => {
        assert(message === null);
        done();
      })
  });

  it('can remove a message from class method', (done) => {
    ChatSystem.remove({ name: 'Tyler' })
      .then(() => ChatSystem.findOne({ name: 'Tyler'}))
      .then((theMessage) => {
        assert(theMessage === null);
        done();
      });
  });

  it('can remove a message by findByIdAndRemove', (done) => {
    ChatSystem.findByIdAndRemove({ _id: message._id })
      .then(() => ChatSystem.findOne({ _id: message._id }))
      .then((theMessage) => {
        assert(theMessage === null);
        done();
      });
  });
});
