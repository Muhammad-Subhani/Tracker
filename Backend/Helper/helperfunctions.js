const crypto = require("crypto");
const usermodel = require("../Models/User_model.js");
function GetHash(val) {
  return crypto.createHash("sha512").update(val).digest("hex");
}
class ApiResponse {
  static success(res, message, code, data) {
    return res.status(code).json({ status: message, data });
  }
  static failure(res, message, code) {
    return res.status(code).json({ status: message });
  }
}

class AuthenticateSignUP {
  static EmptyFields(username, email, password, res) {
    if (!username || !email || !password) return ApiResponse.failure(res, "there is some missing fild !", 500);
  }
  static async AlreadyExisted(email, res) {
    const entry = await usermodel.findOne({ email: email });
    if (entry) return ApiResponse.failure(res, "User Already Exitss Try Login!", 500);
  }
}
class AuthenticateLogin {
  static EmptyFields(email, password, res) {
    if (!email || !password) return ApiResponse.failure(res, "missing field !", 500);
  }
  static async CheckUser(email, res) {
    const entry = await usermodel.findOne({ email: email });
    if (!entry) return ApiResponse.failure(res, "There is no such user try signUp !", 500);
    else return entry;
  }
}
function SendCookie(res, key) {
  res.cookie("TempToken", key, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}
module.exports = {
  GetHash,
  ApiResponse,
  AuthenticateSignUP,
  AuthenticateLogin,
  SendCookie,
}
