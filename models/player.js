const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.']
  },
  email: {
    type: String,
    required: [true, 'Email is required.']
  },
  avatar: {
    type: String,
    default: 'https://s-media-cache-ak0.pinimg.com/originals/cb/3a/a7/cb3aa7a99159c706955dd9b4cf3ae944.jpg'
  },
  gamesWon: {
    type: Number,
    default: 0
  },
  gamesLost: {
    type: Number,
    default: 0
  },
  gamesDrawn: {
    type: Number,
    default: 0
  },
  username: {
    type: String,
    required: [true, 'Username is required.']
  },
  password: {
    type: String,
    required: [true, 'Password is required.']
  },
});

PlayerSchema.virtual('gamesPlayed').get(function() {
  return this.gamesWon + this.gamesLost + this.gamesDrawn;
});

const Player = mongoose.model('player', PlayerSchema);

module.exports = Player;
