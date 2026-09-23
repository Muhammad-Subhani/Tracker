const { ApiResponse } = require("../Helper/helperfunctions.js")
const TrackerModel = require("../Models/Tracker.js")
const TodoModel = require("../Models/ToDos.js")
const CalendarModel = require("../Models/CalendarModel.js");
const { CheckUser } = require("../Helper/helperfunctions.js")
const { HeatMap_records, getFormatteddates } = require("../Helper/statsHelper.js")
async function fetchData(req, res) {
  try {
    // do validation here 
    const reqUser = CheckUser(req, res);
    if (!reqUser) return;
    // fetch relatedData to Tracker
    // making a map for heat map HeatMap_records is doing changes at the address not making a copy  
    const Hmap = new Map();
    const TrackerData = await TrackerModel.findById(reqUser._id);
    if (!TrackerData) ApiResponse.failure(res, "Didnt get the Tracker Records ", 404)
    let completedTracks = 0;
    TrackerData.forEach((p) => {
      (p.HasStop) ? completedTracks++ : completedTracks
      HeatMap_records(Hmap, getFormatteddates(new Date(p.createdAt)), "trackers");
    });
    // Todo
    const TodoData = await TodoModel.findById(reqUser._id);
    if (!TodoData) ApiResponse.failure(res, "Didnt get the Todo Records ", 404)
    let completedTodo = 0;
    TodoData.forEach((p) => {
      (p.isComplete) ? completedTodo++ : completedTodo
      HeatMap_records(Hmap, getFormatteddates(p.createdAt), "todo");
    });
    const CalendarData = await CalendarModel.findById(reqUser._id)
    if (!CalendarData) ApiResponse.failure(res, "Didnt get the Calendar Records ", 404)
    let PastEvents = 0;
    const date = new Date();
    CalendarData.forEach((p) => {
      if (new Date(p.year, p.month, p.date) < date) PastEvents++
      HeatMap_records(Hmap, getFormatteddates(new Date(p.year, p.month, p.date)), "events")
    })
    const HeatMapObj = Object.fromEntries(Hmap);
    ApiResponse.success(res, " successfully fetched data ", 200, {
      stats: {
        TotalTracks: TrackerData.length(),
        CompletedTracks: completedTracks, TotalTodo: TodoData.length(), CompletedTodo: completedTodo,
        TotalEvents: CalendarData.length(), CompletedEvents: PastEvents,
        HeatMapObj: HeatMapObj
      }
    })
  } catch (error) {

    console.error("Error Ocurred !!", error);
    const errmsg = error.message || "Unknown  Error ! ";
    ApiResponse.failure(res, errmsg, 500);
  }
}
module.exports = {
  fetchData,
}
