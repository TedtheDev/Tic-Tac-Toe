const Player = require('../models/player');
const ResetPassword = require('../models/reset_password');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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

  }
}