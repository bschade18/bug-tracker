const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: 3
    }
  },
  { timestamps: true }
);

var User = mongoose.model("User", userSchema);

module.exports = User;
