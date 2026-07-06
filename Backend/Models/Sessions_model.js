const mongoose = require("mongoose");
const Session_schema = new mongoose.Schema({
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_model",
    required: [true, "needed user id "],
  },
  RefreshHashToken: {
    type: String,
    required: [true, "needed the refresh token !"],
  },
  revoked: {
    type: Boolean,
    required: [true, "Must specify either the revoked true or not !"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "7d",
  }
})
const Session_model = mongoose.model("Session_model", Session_schema);
module.exports = Session_model;
