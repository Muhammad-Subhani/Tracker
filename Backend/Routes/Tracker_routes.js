const express = require("express");
const { FunctionValidation } = require("../middlewares/userVerification.js")
const Tracker_Router = express.Router();
const {
  CreateNewTrack,
  StopCurrentWatch,
  GetAllUserData,
  DeleteParticularTrack,
  DeleteAllUserTrack } = require("../Controller/tracker.js")
Tracker_Router.post("/createTrack", FunctionValidation, CreateNewTrack);
Tracker_Router.get("/getTracks", FunctionValidation, GetAllUserData);
Tracker_Router.patch("/updateTrack/:id", FunctionValidation, StopCurrentWatch);
Tracker_Router.delete("/deleteParticular/:id", FunctionValidation, DeleteParticularTrack);
Tracker_Router.delete("/deleteAll", FunctionValidation, DeleteAllUserTrack);
module.exports = { Tracker_Router }
