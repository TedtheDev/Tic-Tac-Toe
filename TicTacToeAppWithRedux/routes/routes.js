const jwt = require('jsonwebtoken');
const secret = require('../creds/secret');
const ChatSystemController = require('../controllers/chat_system_controllers');
const AuthenticationController = require('../controllers/authentication_controllers');

module.exports = (app) => {
  // this function adds Access-Control-Allow-Origin to all requests with
  // GET PUT POST DELETE and OPTIONS
  const allowCrossDomain = function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

      // intercept OPTIONS method
      if ('OPTIONS' == req.method) {
        res.sendStatus(200);
      } else {
        next();
      }

  };

  app.use(allowCrossDomain);

  // Setup middleware to handle that all requests
  // have a token to access
  app.use((req, res, next) => {
    const token = req.body.token || req.query.token || req.header['x-access-token'];

    // check token on request to validate user is authenticated
    if(token && req.path !== '/api/authenticate') {
      console.log('token')
      jwt.verify(token, secret.theSecret, (err, decoded) => {
        if(err) {
          return res.json({ succes: false, message: 'Failed to authenticate token'});
        } else {
          req.decoded = decoded;
          next();
        }
      })
    } else if(req.path === '/api/authenticate') {
      next();
    } else {
      return res.status(403).send({ success: false, message: 'No token provided'})
    }
  });

  // routes for the chat system with an api test greeting
  app.get('/api', ChatSystemController.greeting);
  app.get('/api/chatsystem/messages', ChatSystemController.getMessages);
  app.post('/api/chatsystem/messages', ChatSystemController.createMessage);
  app.delete('/api/chatsystem/messages/:id', ChatSystemController.deleteMessage);

  // authentication route
  app.post('/api/authenticate', AuthenticationController.getToken);


}
