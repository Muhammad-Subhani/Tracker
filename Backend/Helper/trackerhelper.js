const { ApiResponse } = require("./helperfunctions.js")

function Checkuser(req, res) {
  const reqUser = req.user;
  if (!reqUser) {
    ApiResponse.failure(res, "Cant Find the User Who requested !!", 500);
    return null;
  }
  else return reqUser;

}

class CreatingNewTrackHelper {
  static CheckContent(req, res) {
    const { content } = req.body;
    if (!content.trim()) {
      ApiResponse.failure(res, "NO Content ", 400);
      return null;
    }
    else return content;
  }
}
function CheckParams(req, res) {
  const trackid = req.params.id;
  if (!trackid) {
    ApiResponse.failure(res, "There is no Track ID in the params ", 400);
    return null;
  }
  else return trackid;
}


module.exports = {
  CreatingNewTrackHelper,
  CheckParams,
  Checkuser,
}
