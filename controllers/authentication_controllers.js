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
          res.json({ success: false, message: "Authentication failed. User not found."});
        } else if(player){
          bcrypt.compare(req.body.password, player.password, (err, response) => {
            if(!response) {
              res.json({ success: false, message: 'Authentication failed. Password incorrect'});
            } else {
              const token = jwt.sign(player._id, secret.theSecret, { expiresIn: 60 * 60 });
              res.json({ success: true, message: "YAY TOKEN", token: token, player: player})
            }
          })
        }
      })
      .catch(next)
  }
}
