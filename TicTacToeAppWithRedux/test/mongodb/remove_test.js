const assert = require('assert');
const Player = require('../../models/player');

describe('Removing a Player', () => {
  let playerOne;

  beforeEach((done) => {
    playerOne = new Player({
      name: 'Tyler',
      email: 'test@test.com',
      avatar: 'http://i.imgur.com/OqQj7v4.jpg',
      gamesWon: 2,
      gamesLost: 3,
      gamesDrawn: 1
    });

    playerOne.save()
      .then(() => done());
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
});
