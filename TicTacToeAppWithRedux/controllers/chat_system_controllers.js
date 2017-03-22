const ChatSystem = require('../models/ChatSystem');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },
  getMessages(req, res, next) {
    
    ChatSystem.find({ })
      .then((messages) => res.send({ messages }))
      .catch(next);
  }
}
