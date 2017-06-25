const bcrypt = require('bcryptjs');
const Player = require('../models/player');

module.exports = {
  createAccount(req, res, next) {
    const { body } = req;
    Player.findOne({ username: body.username })
      .then((player) => {
        if(player !== null) {
          res.json({success: false, message: 'Username already exists. Create a new Username.'});
        } else {
          bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(body.password, salt, (err, hash) => {
              const newPlayer = new Player({
                name: `${body.firstname} ${body.lastname}`,
                email: body.email,
                username: body.username,
                password: hash,
              })

              newPlayer.save()
                .then((player) => {
                  res.json({success: true, message: 'Player Created'})
                })
                .catch((err) => res.json({success: false, message: err}))
            })
          })
        }
      })
      .catch((err) => res.json({success: false, message: err}))
  },
  updateAccount(req,res,next) {
    const { body } = req;
    const { username } = req.params;
    Player.findOne({ username: username})
      .then((player) => {
        if(!player) {
          res.json({ success: false, message: "Username incorrect"});
        } else if(player){
          if(body.oldPassword !== null && body.newPassword !== null) {
            bcrypt.compare(req.body.oldPassword, player.password, (err, response) => {
              if(!response) {
                res.json({ success: false, message: 'Old Password incorrect'});
              } else {
                bcrypt.genSalt(10, (err,salt) => {
                  bcrypt.hash(body.newPassword, salt, (err, hash) => {
                    Player.findByIdAndUpdate(player._id, { email: body.email, password: hash }, {new: true})
                      .then((updatedPlayerInfo) => {
                        const { _id, name, email, username, gamesDrawn, gamesLost, gamesWon, gamesPlayed, avatar } = updatedPlayerInfo;
                        const theUpdatedPlayer = {
                          _id,
                          name,
                          email,
                          username,
                          gamesDrawn,
                          gamesLost,
                          gamesWon,
                          gamesPlayed,
                          avatar
                        }
                        res.json({success: true, player: theUpdatedPlayer})
                      })
                      .catch((err) => res.json({ success: false, message: err }))
                  })
                })
              }
            })
          } else {
            Player.findByIdAndUpdate(player._id, { email: body.email }, {new: true})
              .then((updatedPlayerInfo) => {
                const { _id, name, email, username, gamesDrawn, gamesLost, gamesWon, gamesPlayed, avatar } = updatedPlayerInfo;
                const theUpdatedPlayer = {
                  _id,
                  name,
                  email,
                  username,
                  gamesDrawn,
                  gamesLost,
                  gamesWon,
                  gamesPlayed,
                  avatar
                }
                res.json({success: true, player: theUpdatedPlayer})
              })
              .catch((err) => res.json({ success: false, message: err }))
          }

        }
      })
  }
}
