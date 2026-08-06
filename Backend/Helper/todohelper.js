const { ApiResponse } = require("./helperfunctions.js")
function Checkuser(req, res) {
  const reqUser = req.user;
  if (!reqUser) {
    ApiResponse.failure(res, "Cant Find the User Who requested !!", 500);
    return null;
  }
  else return reqUser;

}
function CheckParams(req, res) {
  const trackid = req.params.id;
  if (!trackid) {
    ApiResponse.failure(res, "There is no Track ID in the params ", 400);
    return null;
  }
  else return trackid;
}
function CheckContent(req, res) {
  const { content } = req.body;
  if (!content) {
    ApiResponse.failure(res, "There is no Content of todo ", 402);
    return false;
  }
  else return content;
}
module.exports = {
  Checkuser,
  CheckParams,
  CheckContent,
}
