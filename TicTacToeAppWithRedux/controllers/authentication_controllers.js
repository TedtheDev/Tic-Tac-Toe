const jwt = require('jsonwebtoken');
const Player = require('../models/player');
const secret = require('../creds/secret');

module.exports = {
  getToken(req, res, next) {
    Player.findOne({ username: req.body.username})
      .then((player) => {
        if(!player) {
          res.json({ success: false, message: "Authentication failed. User not found."});
        } else if(player){
          if(player.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Password incorrect'});
          } else {
            const token = jwt.sign(player._id, secret.theSecret, { expiresIn: 60 });
            res.json({ success: true, message: "YAY TOKEN", token: token})
          }
        }
      })
      .catch(next)
  }
}
