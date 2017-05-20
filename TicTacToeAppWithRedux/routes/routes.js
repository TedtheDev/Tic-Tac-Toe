const jwt = require('jsonwebtoken');
const secret = require('../creds/secret');
const ChatSystemController = require('../controllers/chat_system_controllers');
const AuthenticationController = require('../controllers/authentication_controllers');
const AccountController = require('../controllers/account_controllers');
const cors = require('cors');

module.exports = (app) => {
  // this function adds Access-Control-Allow-Origin to all requests with
  // GET PUT POST DELETE and OPTIONS

  const whitelist = (process.env.NODE_ENV === 'Dev' ) ? ['http://localhost:8080'] : [];
  const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true, credentials: true, preflightContinue: true } // reflect (enable) the requested origin in the CORS response
    }else{
      corsOptions = { origin: false, credentials: false, preflightContinue: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }
  app.use(cors({ origin: 'http://localhost:8080', credentials: true, methods: ['GET', 'PUT', 'POST', 'DELETE'] }));


  // Setup middleware to handle that all requests
  // have a token to access
  app.use((req, res, next) => {
    const token = req.body.token || req.query.token || req.header['x-access-token'];
    console.log(token)
    // check token on request to validate user is authenticated
    if(token && req.path !== '/api/authenticate') {
      jwt.verify(token, secret.theSecret, (err, decoded) => {
        if(err) {
          return res.json({ succes: false, message: 'Failed to authenticate token'});
        } else {
          req.decoded = decoded;
          next();
        }
      })
    } else if(req.path === '/api/authenticate' || req.path === '/api/account/create' || req.path === '/') {
      next();
    } else {
      return res.status(403).send({ success: false, message: 'No token provided'})
    }
  });

  // chatsystem API
  // routes for the chat system with an api test greeting
  app.get('/api', ChatSystemController.greeting);
  app.get('/api/chatsystem/messages', ChatSystemController.getMessages);
  app.post('/api/chatsystem/messages', ChatSystemController.createMessage);
  app.delete('/api/chatsystem/messages/:id', ChatSystemController.deleteMessage);

  // authentication API
  app.post('/api/authenticate', AuthenticationController.getToken);

  // account API
  app.post('/api/account/create', AccountController.createAccount)

}
