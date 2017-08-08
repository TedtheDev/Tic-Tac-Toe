const Player = require('../models/player');
const ResetPassword = require('../models/reset_password');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

let secret;
let email;
if(process.env.NODE_ENV === 'production' && process.env.THE_SECRET) {
  secret = { theSecret: process.env.THE_SECRET }
  email = { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
} else {
  secret = require('../creds/secret');
  email = require('../creds/creds');
}

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: email.email.user,
    pass: email.email.pass
  }
});

module.exports = {
  resetPassword(req,res,next) {

    // NOTE
    // check if username and email are already there, then update token, other wise create new
    Player.findOne({username: req.body.username, email: req.body.email})
      .then((player) => {
        if(!player) {
            res.json({success: false, message: 'Player or email not found', err: err});
            return;
        }
        // create token to store in database
        const token = jwt.sign({ playerEmail: player.email, username: player.username}, secret.theSecret, { expiresIn: 60 * 60 });

        // initilize reset password object to save to database
        const newResetPassword = new ResetPassword({
          username: player.username,
          email: player.email,
          token: token
        })
        ResetPassword.findOne({username: req.body.username, email: req.body.email})
          .then((resetpassword) => {
            console.log(resetpassword)
          })
        // saving reset password info to db
        newResetPassword.save()
          .then(() => {
            console.log('saved info')

            const mailOptions = {
              rom: '"Tic Tac Toe SocketIO" <tic.tac.toe.socket.io@gmail.com',
              to: player.email,
              subject: 'Password Reset',
              text: `Hello ${player.username}! You requested to reset your password (or someone else did). Please reset your password <a href='http://localhost:8080/resetpassword/verify?token=${token}' target="_blank">HERE</a>.`,
              html: `<div>Hello ${player.username}! You requested to reset your password (or someone else did). Please reset your password <a href='http://localhost:8080/resetpassword/verify?token=${token}' target="_blank">HERE</a>.`
            }

            transporter.sendMail(mailOptions, (err, info) => {
              console.log('sending email')
              if(err) {
                console.log(err);
                res.json({success: false, message: 'Error sending email', err: err.response});
              } else {
                console.log('Message %s sent: %s', info.messageId, info.response);
                res.json({success: true, message: 'Saved reset password info'});
              }
            });
          })
          .catch((err) => res.json({success: false, message: 'Error with saving new reset password info', err: err}));

      })
      .catch((err) => res.json({success: false, message: 'Error with query finding player username', err: err}));
  },
  verifyResetPassword(req,res,next) {
    const token = req.query.token;
    jwt.verify(token, secret.theSecret, (err, player) => {
      if(err) {
        res.json({success: false, message: 'Invalid token', err: err})
      } else {
        ResetPassword.findOne({username: player.username, email: player.playerEmail, token: token})
          .then((record) => {
            if(!record) {
              res.json({success: false, message: 'Player not found'});
            } else {
              res.json({success: true, message: 'Verified reset password'});
            }
          })
          .catch((err) => res.json({success: false, message: 'Error with finding reset password record', err: err}))
      }
    });

  },
  updateResetPassword(req,res,next) {
    const { password, token } = req.body;
    jwt.verify(token, secret.theSecret, (err, player) => {
      if(err) {
        res.json({ success: false, message: 'Invalid token', err: err});
      } else {
        bcrypt.genSalt(10, (err,salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            Player.findOneAndUpdate({ username: player.username, email: player.playerEmail},{password: hash})
              .then(() => {
                ResetPassword.findOneAndRemove({username: player.username})
                  .then(() => {
                    res.json({sucess: true, message: 'Reset Password Successful'});
                  })
                  .catch((err) => res.json({success: false, message: 'Error removing temp reset password record', err: err}))
              })
              .catch((err) => res.json({success: false, message: 'Error saving updating password on reset', err: err}));
          });
        });
      }
    });
  }
}
