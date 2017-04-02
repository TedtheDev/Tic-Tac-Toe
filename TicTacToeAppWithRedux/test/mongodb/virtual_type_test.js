const assert = require('assert');
const Player = require('../../models/player');

describe('Can get virtual types', () => {
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
      .then(() => done())
  });

  it('get gamesPlayed from Player model', (done) => {
    Player.findOne({ name: 'Tyler' })
      .then((player) => {
        assert(player.gamesPlayed === (player.gamesWon + player.gamesLost + player.gamesDrawn));
        done();
      })
  });
});
