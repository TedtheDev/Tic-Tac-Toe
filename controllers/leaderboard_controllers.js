const Player = require('../models/player');

module.exports = {
  getLeaderboard(req,res,next) {
    Player.find({ },{username: 1, gamesWon: 1, gamesLost: 1, gamesDrawn: 1})
      .sort({gamesWon: -1})
      .limit(100)
      .then((players) => {
        res.json({players: players})
      })
      .catch(next)
  }
}
