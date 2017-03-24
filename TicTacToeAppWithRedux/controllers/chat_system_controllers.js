const ChatSystem = require('../models/ChatSystem');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' });
  },
  getMessages(req, res, next) {
    console.log('called /api/chatsystem/messages');

    ChatSystem.find({ })
      .then((messages) => {
        console.log(messages);

        res.send({messages});
      })
      .catch(next);
  }
}
