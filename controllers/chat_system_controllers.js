const ChatSystem = require('../models/chatsystem');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },
  getMessages(req, res, next) {
    ChatSystem.find({ user: req.params.username})
      .then((messages) => {
        const theMessages = messages.map((message) => {
          return { "_id": message._id, "user": message.user, "date": message.date, "message": message.message }
        })
        res.json(theMessages);
      })
      .catch(next);
  },
  createMessage(req, res, next) {
    const theMessage = req.body;
    const user = req.params.username;
    ChatSystem.create({user: user, message: theMessage.message})
      .then((theMessageCreated) => res.json(theMessageCreated))
      .catch(next);
  },
  deleteMessage(req, res, next) {
    const user = req.params.username;
    const theId = req.params.id;
    ChatSystem.findByIdAndRemove(theId)
      .then((messageDeleted) => res.json(messageDeleted))
      .catch(next);
  }
}
