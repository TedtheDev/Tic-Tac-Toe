const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const Player = require('../../models/player');

describe('Create an Account/Player', () => {
  const thePlayer = {
      firstName: '',
      lastName: '',
      email: 'test@test.com',
      username: 'mochatests',
      password: 'mochatests'
  };

  afterEach((done)=> {
    Player.remove({username: thePlayer.username})
      .then((player) => {
        done();
      })
  })

  it('POST /api/account/create should create an account', (done) => {
    request(app)
      .post('/api/account/create')
      .send(thePlayer)
      .expect(200)
      .end((err, res) => {
        const { success, message, player } = res.body;
        assert(
          success === true &&
          message === 'Player Created' &&
          player.username === thePlayer.username
        );
        done();
      })
  })

  it('POST /api/account/create should throw error with Username already created', (done) => {
    // creating thePlayer before another create to make sure
    // we created one before we try to create it again
    request(app)
      .post('/api/account/create')
      .send(thePlayer)
      .expect(200)
      .end((err, res) => {
        // query database to make sure it finds it again
        Player.findOne({username: thePlayer.username})
          .then((player) => {
            if(player !== null) {
              //request to create again with same username as before
              request(app)
                .post('/api/account/create')
                .send(thePlayer)
                .expect(200)
                .end((err, res) => {
                  const { success, message, player } = res.body;
                  assert(
                    success === false &&
                    message === 'Username already exists. Create a new Username'
                  );
                  done();
                })
            }
          })
          .catch((err) => { console.log(err)})
      })
  })

  it('POST /api/account/create should throw error with no body', (done) => {
    request(app)
      .post('/api/account/create')
      .send({})
      .expect(200)
      .end((err, res) => {
        console.log(res.body)
        const { success, message, player } = res.body;
        assert(
          false
        );
        done();
      })
  })
});
