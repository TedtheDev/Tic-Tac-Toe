const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

describe('Get Leaderboard', () => {

  xit('GET /api/leaderboard to show top players', (done) => {
    request(app)
      .get('/api/leaderboard')
      .send()
      .expect(200)
      .end((err, res) => {
        //const { players } = res.body;
        console.log('players', res.body)
        assert(
          players !== undefined &&
          players !== null &&
          players.length > 0
        )
        done();
      })
  })

})
