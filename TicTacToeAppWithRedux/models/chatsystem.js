const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSystemSchema = new Schema({
  user: String,
  date: Date,
  message: String
});

const ChatSystem = mongoose.model('chatsystem', ChatSystemSchema);

module.exports = ChatSystem;
