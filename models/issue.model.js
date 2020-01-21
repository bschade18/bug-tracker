const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const issueSchema = new Schema(
  {
    issueTitle: { type: String, require: true, trim: true },
    issueDescription: { type: String, require: true, trim: true },
    issueLog: [{ name: String, desc: String, date: Date }],
    name: String,
    number: Number,
    date: Date,
    assignedTo: { type: String, require: true, trim: true },
    status: String
  },
  { timestamps: true }
);

var Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
