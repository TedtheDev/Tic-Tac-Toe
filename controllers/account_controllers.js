const bcrypt = require('bcryptjs');
const Player = require('../models/player');
const jwt = require('jsonwebtoken');

let secret;
if(process.env.NODE_ENV === 'production' && process.env.THE_SECRET) {
  secret = { theSecret: process.env.THE_SECRET }
} else {
  secret = require('../creds/secret');
}

module.exports = {
  createAccount(req, res, next) {
    const { body } = req;
    if(body.username === undefined) {
      res.json({success: false, message:"Username not defined"})
    }
    Player.findOne({ username: body.username })
      .then((player) => {
        if(player !== null) {
          res.json({success: false, message: 'Username already exists. Create a new Username'});
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
                  const { _id, name, email, username, gamesDrawn, gamesLost, gamesWon, gamesPlayed, avatar } = player;
                  const theCreatedPlayer = {
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
                  res.json({success: true, message: 'Player Created', player: theCreatedPlayer})
                })
                .catch((err) => res.json({success: false, message: "Player did not save correctly", err: err}))
            })
          })
        }
      })
      .catch((err) => res.json({success: false, message: "Invalid Request", err: err}))
  },
  updateAccount(req,res,next) {
    const { body } = req;
    const { username } = req.params;
    Player.findOne({ username: username})
      .then((player) => {
        if(!player) {
          res.json({ success: false, message: "Username incorrect"});
        } else if(player){
          if(body.oldPassword !== null && body.oldPassword.length > 0
            && body.newPassword !== null && body.newPassword.length > 0) {
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
  },
  updateAccountStats(req,res,next) {
    const { statToUpdate } = req.body;
    const { username } = req.params;
    let playerStat;
    if(statToUpdate === 'gamesWon') {
      playerStat = { $inc: { gamesWon: 1 } };
    } else if(statToUpdate === 'gamesLost') {
      playerStat = { $inc: { gamesLost: 1 } };
    } else if(statToUpdate === 'gamesDrawn') {
      playerStat = { $inc: { gamesDrawn: 1 } };
    } else {
      res.json({ success: false, message: 'not a stat to update'})
    }

    Player.findOneAndUpdate({ username: username }, playerStat, {new: true})
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
