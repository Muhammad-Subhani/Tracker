const mongoose = require("mongoose");
const CalendarSchema = new mongoose.Schema({
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_model",
  },
  title: {
    type: String,
    required: [true, " missing the title "],
  },
  date: {
    type: Number,
    required: [true, " missing the Date "],
  },
  month: {
    type: Number,
    required: [true, " missing the month  "],
  },
  year: {
    type: Number,
    required: [true, " missing the year "],
  },
  startingminutes: {
    type: Number,
    required: [true, " missing the Starting Minutes  "],
  },
  endingminutes: {
    type: Number,
    required: [true, " missing the Ending Minutes "],
  },
  dayno: {
    type: Number,
    required: [true, " missing the day number  "],
  }
})
const calendarModel = mongoose.model("calendarmodel", CalendarSchema);
module.exports = calendarModel;
