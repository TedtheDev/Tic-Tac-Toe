const ChatSystem = require('../models/ChatSystem');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },
  getMessages(req, res, next) {
    //res.header('Content-Type', 'application/json; charset=utf-8')
    ChatSystem.find({ })
      .then((messages) => {
        const theMessages = messages.map((message) => {
          return { "user": message.user, "date": message.date, "message": message.message }
        })
        res.send(messages);
      })
      .catch(next);
  }
}
