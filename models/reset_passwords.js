const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResetPasswordSchema = new Schema({
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
