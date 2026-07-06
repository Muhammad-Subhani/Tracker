const mongoose = require("mongoose");
const OtpSchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_model",
    required: [true, "User Id needed !"]
  },
  email: {
    type: String,
    required: [true, "Needed ID "],
  },
  OTP: {
    type: String,
    required: [true, "Need Otp "],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "5m",
  }
}, { timestamps: true })
const OTP_model = mongoose.model("otp_model", OtpSchema);
module.exports = OTP_model; 
