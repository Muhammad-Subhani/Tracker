const { GetCalendardata, CreateHelper } = require("../Helper/calendarhelper.js");
const { ApiResponse } = require("../Helper/helperfunctions.js");
const CalendarModel = require("../Models/CalendarModel.js");
async function getCalendarEvents(req, res) {
  console.log("Called this >>>>")
  try {
    const reqUser = GetCalendardata.CheckUser(req, res);
    if (!reqUser) return;
    const CalendarObj = await CalendarModel.find({ User_id: reqUser._id });
    console.log("Fetched calendar events:", CalendarObj);
    if (CalendarObj.length == 0) return ApiResponse.success(res, "no events  yet!", 200, { data: [] });
    ApiResponse.success(res, "Successfully Fetched the Calendar Events", 200, {
      data: CalendarObj,
    });
  } catch (error) {
    console.error("Error Ocurred !!", error);
    const errmsg = error.message || "Unknown  Error ! ";
    ApiResponse.failure(res, errmsg, 500);
  }
}
async function createCalendarEvent(req, res) {
  try {
    const reqUser = CreateHelper.CheckUser(req, res);
    if (!reqUser) return;
    const validatedFields = CreateHelper.ValidateFields(req, res);
    if (!validatedFields) return;
    const newEvent = await CalendarModel.create({
      User_id: reqUser._id,
      ...validatedFields,
    });
    ApiResponse.success(res, "Successfully Created the Calendar Event", 201, {
      data: newEvent,
    });
  } catch (error) {
    console.error("Error Ocurred !!", error);
    const errmsg = error.message || "Unknown  Error ! ";
    ApiResponse.failure(res, errmsg, 500);
  }
}
module.exports = {
  getCalendarEvents,
  createCalendarEvent,
};
