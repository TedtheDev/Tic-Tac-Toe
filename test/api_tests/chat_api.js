const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const Player = require('../../models/player');
const ChatSystem = require('../../models/chatsystem');

describe('Messages an Account/Player', () => {
  const thePlayer = {
      firstName: '',
      lastName: '',
      email: 'test@test.com',
      username: 'mochatests',
      password: 'mochatests'
  };

  createPlayer = (thePlayer) => {
    console.log('create player')
    request(app)
      .post('/api/account/create')
      .send(thePlayer)
      .expect(200)
      .end((err, res) => {

      })
  }

  getToken = (username, password) => {
    console.log('getToken')
    request(app)
      .post('/api/authenticate')
      .send({username: thePlayer.username, password: thePlayer.password})
      .expect(200)
      .end((err,res) => {
        console.log(res.body.token)
        return res.body.token;
      })
  }

  xit('GET /api/chatsystem/messages/:username should get all messages related to user', (done) => {
    // create two messages related to thePlayer
    ChatSystem.create({user: thePlayer.username, message: "test message 1"})
      .then((theMessage) => {
        //do nothing
      })
    ChatSystem.create({user: thePlayer.username, message: "test message 2"})
      .then((theMessage) => {
        //do nothing
      })
    createPlayer(thePlayer);
    const theToken = getToken(thePlayer.username, thePlayer.password)
    console.log('token',theToken)
    request(app)
      .get(`/api/chatsystem/messages/${thePlayer.username}`)
      .expect(200)
      .end((err,res) => {
        const { success, message, token, player } = res.body;
        assert(
          false
        )
        done();
      })
  })
})
