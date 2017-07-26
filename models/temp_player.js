const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TempPlayerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.']
  },
  email: {
    type: String,
    required: [true, 'Email is required.']
  },
  username: {
    type: String,
    required: [true, 'Username is required.']
  },
  password: {
    type: String,
    required: [true, 'Password is required.']
  },
  verificationHash: {
    type: String,
    required: [true, 'Verifcation Hash is required']
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

const TempPlayer = mongoose.model('tempplayer', TempPlayerSchema);

module.exports = TempPlayer;
