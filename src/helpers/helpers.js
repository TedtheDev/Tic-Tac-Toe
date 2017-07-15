import axios from 'axios';

// Root url for api
// for now when deploying to prod
// (yes i know that's not good, need to research a better way)
// switch to ./api
// prod = ./api
// dev = http://localhost:3050/api
const ROOT_URL = 'http://localhost:3050/api';

const helpers = {
  getLeaderboard(page) {
    const token = localStorage.getItem('token');
    return axios.get(`${ROOT_URL}/leaderboard?page=${page}&token=${token}`)
  }
}

module.exports = helpers;
