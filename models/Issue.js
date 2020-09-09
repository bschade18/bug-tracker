const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const issueSchema = new Schema(
  {
    issueTitle: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    issueLog: [
      { name: String, desc: String, date: { type: Date, default: Date.now } },
    ],
    name: String,
    number: { type: Number, unique: true },
    date: {
      type: Date,
      default: Date.now,
    },
    assignedTo: {
      type: String,
      required: [true, 'Please assign to a user'],
      trim: true,
    },
    status: String,
    projectTitle: {
      type: String,
      required: [true, 'Please add a project title'],
      trim: true,
    },
    team: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Issue', issueSchema);
