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
        res.json(messages);
      })
      .catch(next);
  },
  createMessage(req, res, next) {
    const theMessage = req.body;

    ChatSystem.create({ user: theMessage.user, message: theMessage.message})
      .then((theMessageCreated) => res.json(theMessageCreated))
      .catch(next);
  },
  deleteMessage(req, res, next) {
    const theId = req.params.id;
    console.log(theId);
    ChatSystem.findByIdAndRemove({ _id: theId })
      .then((messageDeleted) => res.json(messageDeleted))
      .catch(next);
  }
}
