const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const Player = require('../../models/player');

describe('Update an Account/Player\'s information', () => {
  const thePlayer = {
      firstName: '',
      lastName: '',
      email: 'test@test.com',
      username: 'mochatests',
      password: 'mochatests'
  };
  xit('POST /api/account/update/:username should update account email', (done) => {
    request(app)
      .post(`/api/account/update/${thePlayer.username}`)
      .send({username: thePlayer.username})
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

  xit('POST /api/authenticate should throw error on correct username and incorrect password', (done) => {
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


  xit('POST /api/authenticate should throw error on incorrect username and correct password', (done) => {
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

  xit('POST /api/authenticate should throw error on passing no creds', (done) => {
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
