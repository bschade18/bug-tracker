const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      minLength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'Please add an email address'],
      trim: true,
      unique: true,
      minLength: 6,
      maxLength: 255,
    },
    team: {
      type: String,
      required: [true, 'Please enter a team name'],
      minLength: 3,
      maxLength: 50,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minLength: 6,
      maxLength: 1024,
    },
  },
  { timestamps: true }
);

userSchema.index({ name: 1, team: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
