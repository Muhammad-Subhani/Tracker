const express = require("express");
const { FunctionValidation } = require("../middlewares/userVerification.js")
const Tracker_Router = express.Router();
Tracker_Router.post("/createTrack", FunctionValidation, CreateNewTrack);
Tracker_Router.get("/getTracks", GetAllUserData);
Tracker_Router.patch("/updateTrack/:id", FunctionValidation, StopCurrentWatch);
Tracker_Router.delete("/deleteParticular/:id", DelteParticularTrack);
Tracker_Router.delete("/deleteAll/:id", DeleteAllUserTrack);
module.exports = { Tracker_Router }
