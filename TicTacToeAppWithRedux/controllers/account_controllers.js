const bcrypt = require('bcryptjs');
const Player = require('../models/player');

module.exports = {
  createAccount(req, res, next) {
    const { body } = req;
    Player.findOne({ username: body.username })
      .then((player) => {
        if(player !== null) {
          res.json({success: false, message: 'Player already exists. Create a new Username.'});
        } else {
          console.log('in hash');
          console.log('in hash');
          bcrypt.genSalt(10, (err,salt) => {
            console.log('salt', salt);
            bcrypt.hash(body.password, salt, (err, hash) => {
              console.log(hash);
              const newPlayer = new Player({
                name: `${body.firstname} ${body.lastname}`,
                email: body.email,
                username: body.username,
                password: hash,
              })

              newPlayer.save()
                .then((player) => {
                  res.json({success: true, message: 'Player Created', player: player})
                })
                .catch((err) => res.json({success: false, message: err}))
            })
          })
        }
      })
      .catch((err) => res.json({success: false, message: err}))
  }
}
