const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      unique: true,
      minLength: 3,
      maxlength: 50,
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

module.exports = mongoose.model('Team', teamSchema);
