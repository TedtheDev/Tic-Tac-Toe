const assert = require('assert');
const Player = require('../../models/player');

describe('Creating a Player', () => {
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
});
