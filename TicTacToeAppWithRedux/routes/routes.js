const ChatSystemController = require('../controllers/chat_system_controllers');

module.exports = (app) => {
  // Watch for incoming requests of method GET
  // to the route https://localhost:3050/api
  app.get('/api', ChatSystemController.greeting);


  app.get('/api/chatsystem/messages', ChatSystemController.getMessages);

}
