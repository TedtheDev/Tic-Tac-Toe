const bcrypt = require('bcryptjs');
const Player = require('../models/player');
const TempPlayer = require('../models/temp_player');
const jwt = require('jsonwebtoken');

let EMAIL_API_CREDS;
if(process.env.NODE_ENV === 'production' && process.env.MAILGUN_API_KEY && process.env.MAILGUN_DOMAIN) {
  EMAIL_API_CREDS = { key: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN}
} else {
  EMAIL_API_CREDS = require('../creds/creds').EMAIL_API;
}

const MailgunService = require('../utils/mailgun_service')(EMAIL_API_CREDS.key, EMAIL_API_CREDS.domain);

let secret;
let email;
if(process.env.NODE_ENV === 'production' && process.env.THE_SECRET) {
  secret = { theSecret: process.env.THE_SECRET }
  email = { email: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS} }
} else {
  secret = require('../creds/secret');
  email = require('../creds/creds');
}

// generate hash for random link to verify account
generateRandomHash = (length) => {
    chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let hash = "";
    for(let i = 0; i < length; i++) {
      hash += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return hash;
}

module.exports = {
  createAccount(req, res, next) {
    const { body } = req;
    if(body.username === undefined) {
      res.json({success: false, message:"Username not defined"})
    }
    TempPlayer.findOne({ username: body.username })
      .then((tempPlayer) => {
        if(tempPlayer !== null) { // by pass, might not even need
          res.json({success: false, message: 'Username already exists. Create a new Username'});
        } else {
          Player.findOne({ username: body.username })
            .then((player) => {
              if(player !== null) {
                res.json({success: false, message: 'Username already exists. Create a new Username'});
              } else {
                bcrypt.genSalt(10, (err,salt) => {
                  bcrypt.hash(body.password, salt, (err, hash) => {
                    const newTempPlayer = new TempPlayer({
                      name: `${body.firstname} ${body.lastname}`,
                      email: body.email,
                      username: body.username,
                      password: hash,
                      verificationHash: generateRandomHash(30)
                    })

                    const host = process.env.NODE_ENV === 'production' && 'https://tic-tac-toe-socketio.herokuapp.com' || 'http://localhost:3050';
                    const msg = {
                      to: body.email,
<<<<<<< HEAD
                      from: '"Tic Tac Toe SocketIO" tic.tac.toe.socket.io@gmail.com',
                      subject: 'Verify Your Account',
                      text: `Hello ${newTempPlayer.username}! Please verify your account by clicking this <a href='https://tic-tac-toe-socketio.herokuapp.com/verify/${newTempPlayer.username}/${newTempPlayer.verificationHash}' target="_blank">HERE</a>.`,
                      html: `<div>Hello ${newTempPlayer.username}! Please verify your account by clicking this <a href='https://tic-tac-toe-socketio.herokuapp.com/verify/${newTempPlayer.username}/${newTempPlayer.verificationHash}' target="_blank">HERE</a>.`
=======
                      from: 'Tic Tac Toe SocketIO tic.tac.toe.socket.io@gmail.com',
                      subject: 'Tic Tac Toe - Verify Your Account',
                      text: `Hello ${newTempPlayer.username}! Please verify your account by clicking this <a href='${host}/verify/${newTempPlayer.username}/${newTempPlayer.verificationHash}' target="_blank">HERE</a>.`,
                      html: `<div>Hello ${newTempPlayer.username}! Please verify your account by clicking this <a href='${host}/verify/${newTempPlayer.username}/${newTempPlayer.verificationHash}' target="_blank">HERE</a>.`
>>>>>>> development
                    };
                    
                    MailgunService(msg)
                      .then((theMessage) => {
                        newTempPlayer.save()
                          .then((tempPlayer) => {
                            const { _id, name, email, username, verificationHash } = tempPlayer;
                            const theCreatedTempPlayer = {
                              _id,
                              name,
                              email,
                              username,
                              verificationHash
                            };

                            res.json({success: true, message: "Temp Player created"});
                          })
                          .catch((err) => res.json({success: false, message: "Player did not save correctly", err: err}));
                      })
                      .catch((err) => res.json({success: false, message: "MailgunService failed", err: err}));

                    
                  })
                })
              }
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
  },
  verifyAccount(req,res,next) {
    const { username, hash } = req.params
    TempPlayer.findOne({ username: username, verificationHash: hash})
      .then((tempPlayer) => {
        if(!tempPlayer) {
          res.json({success: false, message: 'Username was not found'});
        } else {
          if(tempPlayer.isVerified) {
            res.json({success: true, message: 'Already Verified'})
          } else {
            const newPlayer = new Player({
                name: tempPlayer.name,
                email: tempPlayer.email,
                username: tempPlayer.username,
                password: tempPlayer.password
            });
            newPlayer.save()
            .then(() => {
                  TempPlayer.findByIdAndUpdate(tempPlayer._id, {isVerified: true})
                    .then((temp) => {
                      res.json({success: true, message: 'Verified Account'})
                    })
                    .catch((err) => res.json({ success: false, message: "Temp Player didn't update correctly", err: err}));
                })
                .catch((err) => res.json({success: false, message: "Player did not save correctly", err: err}));
          }
        }
      })
  }
}
