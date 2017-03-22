const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSystemSchema = new Schema({
  user: String,
  date: String,
  message: String
}, { collection: 'chatsystem' });

const ChatSystem = mongoose.model('chatsystem', ChatSystemSchema);

module.exports = ChatSystem;
