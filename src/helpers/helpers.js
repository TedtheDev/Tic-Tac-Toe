import axios from 'axios';

// Root url for api
const ROOT_URL = process.env.NODE_ENV === 'production' && './api' || 'http://localhost:3050/api';

const helpers = {
  getLeaderboard(page) {
    const token = localStorage.getItem('token');
    return axios.get(`${ROOT_URL}/leaderboard?page=${page}&token=${token}`)
  }
}

module.exports = helpers;
