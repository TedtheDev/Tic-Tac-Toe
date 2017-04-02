const assert = require('assert');
const Player = require('../../models/player');
const ChatSystem = require('../../models/chatsystem');

describe('Creating a Player and Messages', () => {
  it('saves a Player', (done) => {
    const playerOne = new Player({
      name: 'Tyler',
      email: 'test@test.com',
      avatar: 'http://i.imgur.com/OqQj7v4.jpg',
      gamesWon: 2,
      gamesLost: 3,
      gamesDrawn: 1
    });

    playerOne.save()
      .then(() => {
        assert(!playerOne.isNew);
        done();
      });
  });

  it('saves a message', (done) => {
    const message = new ChatSystem({
      user: 'Tyler',
      message: 'This is a message for mocha testing'
    });

    message.save()
      .then(() => {
        assert(!message.isNew);
        done();
      })
  });
});
