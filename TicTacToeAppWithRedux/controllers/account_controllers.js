const Player = require('../models/player');

module.exports = {
  createAccount(req, res, next) {
    const { body } = req;
    Player.findOne({ username: body.username })
      .then((player) => {
        if(player !== null) {
          res.json({success: false, message: 'Player already exists. Create a new Username.'});
        } else {
          const newPlayer = new Player({
            name: `${body.firstname} ${body.lastname}`,
            email: body.email,
            username: body.username,
            password: body.password,
          })
          newPlayer.save()
            .then((player) => {
              res.json({success: true, message: 'Player Created', player: player})
            })
            .catch((err) => res.json({success: false, message: err}))
        }
      })
      .catch((err) => res.json({success: false, message: err}))
  }
}
