const mongoose = require("mongoose");
const user_schema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "You should give the username !"],
  },
  email: {
    type: String,
    required: [true, "You Should give the email !"],
    unique: [true, "you should give a unique email !"],
  },
  password: {
    type: String,
    required: [true, "must give the password !"],
  },
  verified: {
    type: Boolean,
    required: [true, "must specify the status !"]
  },

})
const usermodel = mongoose.model("user_model", user_schema);
module.exports = usermodel

