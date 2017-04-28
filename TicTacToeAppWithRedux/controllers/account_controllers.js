const Player = require('../models/player');

module.exports = {
  createAccount(req, res, next) {
    const { body } = req;
    Player.findOne({ username: body.username })
      .then((player) => {
        if(player !== null) {
          res.json({message: 'Player already exists. Create a new Username.'});
        } else {
          const newPlayer = new Player({
            name: `${body.firstname} ${body.lastname}`,
            email: body.email,
            username: body.username,
            password: body.password,
          })
          newPlayer.save()
            .then((player) => {
              res.json({message: 'Player Created', player: player})
            })
            .catch((err) => res.json(err))
        }
      })
      .catch((err) => res.json(err))
  }
}
