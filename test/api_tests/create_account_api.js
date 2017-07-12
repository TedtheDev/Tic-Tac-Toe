const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const Player = require('../../models/player');

describe('Create an Account/Player', () => {

  it('GET /api to test api', (done) => {
    request(app)
      .get('/api')
      .expect(200)
      .end((err,res) => {
        assert(res)
        done();
      })
  })
  const thePlayer = {
      firstName: '',
      lastName: '',
      email: 'test@test.com',
      username: 'mochatests',
      password: 'mochatests'
  };
  it('POST /api/account/create should create an account', (done) => {
    request(app)
      .post('/api/account/create')
      .send(thePlayer)
      .expect(200)
      .end((err, res) => {
        const { success, message, player } = res.body;
        console.log(message)
        assert(
          success === true &&
          message === 'Player Created' &&
          player.username === thePlayer.username
        );
        done();
        /*
        Player.findOneAndRemove({username: player.username})
          .then((player) => {
            console.log('Removed',player)
            done();
          })
          */
      })
  })



});
