const {
  AuthForEveryAccess,
  VerifyUser,
} = require("../Helper/helperfunctions.js")
async function FunctionValidation(req, res, next) {
  try {
    const token = AuthForEveryAccess.CheckBearer(req, res);
    if (!token) return;
    const obj = await AuthForEveryAccess.RevokeCheck(res, token);
    if (!obj) return;
    const UserData = await AuthForEveryAccess.SessionCheck(res, obj);
    if (!UserData) return;
    const verify = VerifyUser.Verify(res, UserData);
    if (!verify) return;
    req.user = UserData;
    next();
    // ==able to access any service now ==
  }
  catch (error) {
    console.error("Error Ocurred !!", error);
    const errmsg = error.message || "Unknown  Error ! ";
    ApiResponse.failure(res, errmsg, 500);
  }
}
module.exports = {
  FunctionValidation,
}
