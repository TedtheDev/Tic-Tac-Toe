const assert = require('assert');
const Player = require('../../models/player');

describe('Update a Player', () => {
  let playerOne;

  beforeEach((done) => {
    playerOne = new Player({
      name: 'Tyler',
      email: 'test@test.com',
      password: 'testpass',
      username: 'testusername',
      avatar: 'http://i.imgur.com/OqQj7v4.jpg',
      gamesWon: 2,
      gamesLost: 3,
      gamesDrawn: 1
    })

    playerOne.save()
      .then(() => done())
  })

  it('can update an email address', (done) => {
    Player.findOneAndUpdate({ username: 'testusername'}, { email: 'updated@email.com'}, {new: true})
      .then((player) => {
        assert(player.email === 'updated@email.com');
        done();
      })
      .catch((err) => console.log(err))
  })

})
