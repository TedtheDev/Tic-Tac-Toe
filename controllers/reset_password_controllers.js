const Player = require('../models/player');
const ResetPassword = require('../models/reset_password');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
  email = { email: {user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS} }
} else {
  secret = require('../creds/secret');
  email = require('../creds/creds');
}

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
          })
        // saving reset password info to db
        newResetPassword.save()
          .then(() => {
            const host = process.env.NODE_ENV === 'production' && 'https://tic-tac-toe-socketio.herokuapp.com' || 'http://localhost:3050';

            const msg = {
              to: player.email,
<<<<<<< HEAD
              from: '"Tic Tac Toe SocketIO" tic.tac.toe.socket.io@gmail.com',
              subject: 'Verify Your Account',
              text: `Hello ${player.username}! You requested to reset your password (or someone else did). Please reset your password <a href='https://tic-tac-toe-socketio.herokuapp.com/resetpassword/verify?token=${token}' target="_blank">HERE</a>.`,
              html: `<div>Hello ${player.username}! You requested to reset your password (or someone else did). Please reset your password <a href='https://tic-tac-toe-socketio.herokuapp.com/resetpassword/verify?token=${token}' target="_blank">HERE</a>.`
=======
              from: 'Tic Tac Toe SocketIO tic.tac.toe.socket.io@gmail.com',
              subject: 'Tic Tac Toe - Reset Password',
              text: `Hello ${player.username}! You requested to reset your password (or someone else did). Please reset your password <a href='${host}/resetpassword/verify?token=${token}' target="_blank">HERE</a>.`,
              html: `<div>Hello ${player.username}! You requested to reset your password (or someone else did). Please reset your password <a href='${host}/resetpassword/verify?token=${token}' target="_blank">HERE</a>.`
>>>>>>> development
            };

            MailgunService(msg)
              .then((theMessage) => {
                res.json({success: true, message: "Sent Email for Password Reset"})

              })
              .catch((err) => res.json({success: false, message: "MailgunService failed", err: err}));

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
    // check ResetPassword collection if token exists
    ResetPassword.findOne({token: token})
      .then((foundToken) => {
        // checking if token was found in ResetPassword collection
        if(foundToken) {
          //verify token if valid
          jwt.verify(token, secret.theSecret, (err, player) => {
            if(err) {
              // send response with Invalid token
              res.json({ success: false, message: 'Invalid token', err: err});
            } else {
              // start salting with bcrypt
              bcrypt.genSalt(10, (err,salt) => {
                // generate hash
                bcrypt.hash(password, salt, (err, hash) => {
                  //find Player in Players collection with token info
                  // add update player with hashed password
                  Player.findOneAndUpdate({ username: player.username, email: player.playerEmail},{password: hash})
                    .then((foundPlayer) => {
                      //remove document in ResetPassword collection
                      ResetPassword.findOneAndRemove({username: player.username, email: player.playerEmail, token: token})
                        .then(() => {
                          // send response with success
                          res.json({success: true, message: 'Reset password successful'});
                        })
                        .catch((err) => res.json({success: false, message: 'Error removing temp reset password record', err: err}))
                    })
                    .catch((err) => res.json({success: false, message: 'Error saving updating password on reset', err: err}));
                });
              });
            }
          });
        } else {
          res.json({ success: false, message: 'Invalid token'})
        }
      })
      .catch((err) => res.json({ success: false, message:'Error with finding token', err: err}));
  },
  verifyToken(req,res,next) {
    //grab token off of the request body
    const { token } = req.body;

    //Use the ResetPassword model to find the
    // token in the collection
    ResetPassword.findOne({ token: token})
      .then((token) => {
        //if token exists in the reset password collection, send
        //back successful response that token is found
        if(token) {
          res.json({ success: true, message: 'Token found' })
        } else {
          res.json({ success: false, message: 'Token not found'})
        }
      })
      .catch((err) => res.json({success: false, message: 'Error finding token in database', err: err}));
  }
}
