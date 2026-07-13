const trackmodel = require("../Models/Tracker.js");
const { ApiResponse } = require("../Helper/helperfunctions.js")
const {
  CreatingNewTrackHelper,
  CheckParams,
  CheckUser,
} = require("../Helper/trackerhelper.js")

async function CreateNewTrack(req, res) {
  try {
    const content = CreatingNewTrackHelper.CheckContent(req, res);
    if (!content) return;
    const reqUser = CheckUser(req, res);
    if (!reqUser) return
    const userTrack = await trackmodel.create({
      User_id: reqUser._id,
      content: content,
      HasStop: false,
      StartTime: Date.now(),
    });
    return ApiResponse.success(res, "created the track ", 200, { track: userTrack })
  }
  catch (error) {
    console.error("Error Ocurred !!", error);
    const errmsg = error.message || "Unknown  Error ! ";
    ApiResponse.failure(res, errmsg, 500);
  }
}
async function StopCurrentWatch(req, res) {
  try {
    const trackid = CheckParams(req, res);
    if (!trackid) return;
    const reqUser = CheckUser(req, res);
    if (!reqUser) return;
    const modifiredTrack = await trackmodel.findOneAndUpdate({ _id: trackid, User_id: reqUser._id },
      { HasStop: true, EndTime: Date.now() },
      { new: true });
    if (!modifiredTrack) return ApiResponse.failure(res, "Unauthorized 404 !!", 500);
    return ApiResponse.success(res, "Updated the Track ", 200, { track: modifiredTrack })
  } catch (error) {
    console.error("Error Ocurred !!", error);
    const errmsg = error.message || "Unknown  Error ! ";
    ApiResponse.failure(res, errmsg, 500);
  }
}

async function GetAllUserData(req, res) {
  try {
    const reqUser = CheckUser(req, res);
    if (!reqUser) return;
    const allTracks = await trackmodel.find(reqUser._id);
    // ive sent success because this will be shown on the default screen so if no track gracefully success method and empty {}
    if (allTracks.length == 0) return ApiResponse.success(res, "no tracks yet!", 200, { alltracks: {} });
    return ApiResponse.success(res, "Here is list of all tracks !", 200, { alltracks: allTracks })
  } catch (error) {
    console.error("Error Ocurred !!", error);
    const errmsg = error.message || "Unknown  Error ! ";
    ApiResponse.failure(res, errmsg, 500);
  }
}
async function DeleteParticularTrack(req, res) {
  try {
    const reqUser = CheckUser(req, res);
    if (!reqUser) return;
    const trackid = CheckParams(req, res);
    if (!trackid) return;
    const deletestatus = await trackmodel.deleteOne({ _id: trackid, User_id: reqUser._id });
    if (!deletestatus.deletedCount == 0) return ApiResponse.failure(res, "No Such track !", 500);
    return ApiResponse.success(res, "Deleted the particular track !", 200, { numDeleted: deletestatus })
  } catch (error) {
    console.error("Error Ocurred !!", error);
    const errmsg = error.message || "Unknown  Error ! ";
    ApiResponse.failure(res, errmsg, 500);
  }
}

async function DeleteAllUserTrack(req, res) {
  try {
    const reqUser = CheckUser(req, res);
    if (!reqUser) return;
    const deletestatus = await trackmodel.deleteMany({ User_id: reqUser._id });
    if (!deletestatus.deletedCount == 0) return ApiResponse.failure(res, "No Deletion !", 500);
    return ApiResponse.success(res, "Successfullly deleted all the data !", 200, { numDeleted: deletestatus })
  } catch (error) {
    console.error("Error Ocurred !!", error);
    const errmsg = error.message || "Unknown  Error ! ";
    ApiResponse.failure(res, errmsg, 500);
  }
}

module.exports = {
  CreateNewTrack,
  StopCurrentWatch,
  GetAllUserData,
  DeleteParticularTrack,
  DeleteAllUserTrack,
}
