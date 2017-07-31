const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResetPasswordSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required.']
  },
  email: {
    type: String,
    required: [true, 'Email is required.']
  },
  token: {
    type: String,
    required: [true, 'Token is required']
  },
});

const ResetPassword = mongoose.model('resetpassword', ResetPasswordSchema);

module.exports = ResetPassword;
