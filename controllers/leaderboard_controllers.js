const Player = require('../models/player');

module.exports = {
  getLeaderboard(req,res,next) {
    const { page } = req.query
    Player.find({ },{username: 1, gamesWon: 1, gamesLost: 1, gamesDrawn: 1})
      .sort({gamesWon: -1})
      .count()
      .then((playersCount) => {
        Player.find({ },{username: 1, gamesWon: 1, gamesLost: 1, gamesDrawn: 1})
          .sort({gamesWon: -1})
          .limit(10)
          .skip(Number(page + "0"))
          .then((players) => {
            res.json({success: true, players: players, totalCount: playersCount})
          })
          .catch((err) => res.json({success: false, err: err}))
      })
      .catch((err) => res.json({success: false, err: err}))

  }
}
