const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Player = require('../models/player');

let secret;
if(process.env.NODE_ENV === 'production' && process.env.THE_SECRET) {
  secret = { theSecret: process.env.THE_SECRET }
} else {
  secret = require('../creds/secret');
}


module.exports = {
  getToken(req, res, next) {
    Player.findOne({ username: req.body.username})
      .then((player) => {
        if(!player) {
          res.json({ success: false, message: "Username or Password incorrect"});
        } else if(player){
          bcrypt.compare(req.body.password, player.password, (err, response) => {
            if(!response) {
              res.json({ success: false, message: 'Username or Password incorrect'});
            } else {
              const token = jwt.sign(player._id, secret.theSecret, { expiresIn: 60 * 60 });
              const thePlayer = {
                _id: player._id,
                username: player.username,
                avatar: player.avatar,
                email: player.email,
                gamesDrawn: player.gamesDrawn,
                gamesLost: player.gamesLost,
                gamesWon: player.gamesWon,
                name: player.name,
              }
              res.json({ success: true, message: "YAY TOKEN", token: token, player: thePlayer})
            }
          })
        }
      })
      .catch(next)
  }
}
