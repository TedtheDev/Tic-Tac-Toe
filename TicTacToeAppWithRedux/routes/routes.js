const ChatSystemController = require('../controllers/chat_system_controllers');

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
  // Watch for incoming requests of method GET
  // to the route https://localhost:3050/api
  app.get('/api', ChatSystemController.greeting);


  app.get('/api/chatsystem/messages', ChatSystemController.getMessages);

}
