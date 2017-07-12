const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const Player = require('../../models/player');

describe('Authenticate an Account/Player', () => {
  const thePlayer = {
      firstName: '',
      lastName: '',
      email: 'test@test.com',
      username: 'mochatests',
      password: 'mochatests'
  };

  beforeEach((done) => {
    request(app)
      .post('/api/account/create')
      .send(thePlayer)
      .expect(200)
      .end((err, res) => {
        done();
      })
  })

  afterEach((done)=> {
    Player.remove({username: thePlayer.username})
      .then((player) => {
        done();
      })
  })

  it('POST /api/authenticate should authenticate and receive a token', (done) => {
    request(app)
      .post('/api/authenticate')
      .send({username: thePlayer.username, password: thePlayer.password})
      .expect(200)
      .end((err,res) => {
        const { success, message, token, player } = res.body;
        assert(
          success === true &&
          message === 'YAY TOKEN' &&
          token !== null &&
          token.length > 0 &&
          player.username === thePlayer.username
        )
        done();
      })
  })

  it('POST /api/authenticate should throw error on correct username and incorrect password', (done) => {
    request(app)
      .post('/api/authenticate')
      .send({username: thePlayer.username, password: 'incorrect password'})
      .expect(200)
      .end((err,res) => {
        const { success, message } = res.body;
        assert(
          success !== true &&
          message === 'Username or Password incorrect'
        )
        done();
      })
  })


  it('POST /api/authenticate should throw error on incorrect username and correct password', (done) => {
    request(app)
      .post('/api/authenticate')
      .send({username: 'incorrect username', password: thePlayer.password})
      .expect(200)
      .end((err,res) => {
        const { success, message } = res.body;
        assert(
          success !== true &&
          message === 'Username or Password incorrect'
        )
        done();
      })
  })

  it('POST /api/authenticate should throw error on passing no creds', (done) => {
    request(app)
      .post('/api/authenticate')
      .send({})
      .expect(200)
      .end((err,res) => {
        const { success, message } = res.body;
        assert(
          success !== true &&
          message === 'Username or Password incorrect'
        )
        done();
      })
  })
})
