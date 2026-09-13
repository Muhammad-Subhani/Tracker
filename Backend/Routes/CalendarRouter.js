const express = require("express")
const { FunctionValidation } = require("../middlewares/userVerification.js")
const calendarRouter = express.Router();
const {getCalendarEvents ,createCalendarEvent} = require("../Controller/calendar.js")
// default /api/calendar
calendarRouter.get("/getexistingevents" , FunctionValidation , getCalendarEvents);
 calendarRouter.post("/createnewevent" , FunctionValidation , createCalendarEvent);


module.exports = {
  calendarRouter
}
