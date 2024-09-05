const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
    default: "Open",
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  effortRequired: {
    type: Number,
    min: 0,
    required: true,
  },
  dueDate: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("Issues", issueSchema);
