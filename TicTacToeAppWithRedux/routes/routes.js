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

    if(token) {
      jwt.verify(token, secret.theSecret, (err, decoded) => {
        if(err) {
          return res.json({ succes: false, message: 'Failed to authenticate token'});
        } else {
          req.decoded = decoded;
          next();
        }
      })
    } else {
      return res.status(403).send({ success: false, message: 'No token provided'})
    }
  });

  // Watch for incoming requests of method GET
  // to the route https://localhost:3050/api
  app.get('/api', ChatSystemController.greeting);
  app.get('/api/chatsystem/messages', ChatSystemController.getMessages);
  app.post('/api/chatsystem/messages', ChatSystemController.createMessage);
  app.delete('/api/chatsystem/messages/:id', ChatSystemController.deleteMessage);


  app.post('/api/authenticate', AuthenticationController.getToken);

}
