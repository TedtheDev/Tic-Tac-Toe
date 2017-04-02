const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is reqruied.']
  },
  email: {
    type: String,
    required: [true, 'Email is required.']
  },
  avatar: String,
  gamesWon: Number,
  gamesLost: Number,
  gamesDrawn: Number
});

PlayerSchema.virtual('gamesPlayed').get(function() {
  return this.gamesWon + this.gamesLost + gamesDrawn;
});

const Player = mongoose.model('player', PlayerSchema);

module.exports = Player;
