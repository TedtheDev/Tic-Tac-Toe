const jwt = require('jsonwebtoken');
const ChatSystemController = require('../controllers/chat_system_controllers');
const AuthenticationController = require('../controllers/authentication_controllers');
const AccountController = require('../controllers/account_controllers');
const cors = require('cors');
const path = require('path');

let secret;
if(process.env.NODE_ENV === 'production' && process.env.THE_SECRET) {
  secret = { theSecret: process.env.THE_SECRET }
} else {
  secret = require('../creds/secret');
}

module.exports = (app) => {
  // this function adds Access-Control-Allow-Origin to all requests with
  // GET PUT POST DELETE and OPTIONS

  const whitelist = (process.env.NODE_ENV === 'dev' ) ? ['http://localhost:8080'] : [];
  const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true, credentials: true, methods: ['GET', 'PUT', 'POST', 'DELETE']  } // reflect (enable) the requested origin in the CORS response
    }else{
      corsOptions = { origin: false, credentials: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }
  app.use(cors(corsOptionsDelegate));

/*
  // Setup middleware to handle that all requests
  // have a token to access
  //
  app.use('*',(req, res, next) => {
    const token = req.body.token || req.query.token || req.header['x-access-token'];
    // check token on request to validate user is authenticated
    if(token && req.path !== '/api/authenticate' ) {
      jwt.verify(token, secret.theSecret, (err, user) => {
        if(err) {
          return res.json({ succes: false, message: 'Failed to authenticate token'});
        }
          next();
      })
    } else if(req.path === '/api/authenticate' || req.path === '/api/account/create' || req.path === '/' || req.path === '/dist/bundle.js' || req.path === '/dist/bundle.css' || req.path === '/favicon.ico') {
      next();
    } else {
      return res.sendFile(path.resolve(__dirname + '/'));
    }
  });

*/

  // Function to check token username with param username
  // If they don't match, throw a failed authentication
  // If they match, move along
  const checkToken = (req,res,next) => {
    const token = req.body.token || req.query.token || req.header['x-access-token'];
    jwt.verify(token, secret.theSecret, (err, user) => {
      if(err) {
        return res.json({ succes: false, message: 'Failed to authenticate token'});
      } else {
        console.log('ddd',req.params.username)
        console.log('ddd',user.username)
        if(req.params.username !== undefined && req.params.username !== user.username) {
          return res.json({ succes: false, message: 'Failed to authenticate tokdddden'});
        }
        console.log('no params')
        next();
      }
    })
  }
  // chatsystem API
  // routes for the chat system with an api test greeting
  app.get('/api/chatsystem/messages/:username', checkToken, ChatSystemController.getMessages);
  app.post('/api/chatsystem/messages/:username', checkToken, ChatSystemController.createMessage);
  app.delete('/api/chatsystem/messages/:username/:id', checkToken, ChatSystemController.deleteMessage);

  // authentication API
  app.post('/api/authenticate', AuthenticationController.getToken);

  // account API
  app.post('/api/account/create', AccountController.createAccount)
  app.put('/api/account/update/:username', checkToken, AccountController.updateAccount)
  app.put('/api/account/update/:username/stats', checkToken, AccountController.updateAccountStats)

}
