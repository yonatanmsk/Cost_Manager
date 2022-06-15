const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: {type: Number, required: true, minlength: 1},
  firstname: { type: String, required: true, unique: true, trim: true, minlength: 2},
  lastname: { type: String, required: true, trim: true, minlength: 2},
  birthday: { type: Date, required: true},
  marital_status: { type: String, required: true }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;