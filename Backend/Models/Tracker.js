const mongoose = require("mongoose");
const TrackerSchema = new mongoose.Schema({
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_model",
    required: ["There is no User connection", true],
  },
  content: {
    type: String,
    required: ["needed the content", true]
  },
  HasStop: {
    type: Boolean,
    default: false,
  },
  StartTime: { // must have a starting time thats why wrote required
    type: Date,
    required: ["whats the starting time", true]
  },
  EndTime: {
    type: Date
  }
}, { timestamps: true })
const TrackerModel = mongoose.model("Tracks", TrackerSchema);
module.exports = TrackerModel
