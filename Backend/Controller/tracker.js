const trackmodel = require("../Models/Tracker.js");
const { ApiResponse } = require("../Helper/helperfunctions.js")
const {
  CreatingNewTrackHelper,
  StopCurrentWatchHelper,
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

  async function StopCurrentWatch(req, res) {
    try {
      const trackid = StopCurrentWatchHelper.CheckParams(req, res);
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

}
module.exports = {
  CreateNewTrack,
  StopCurrentWatchHelper,
}
