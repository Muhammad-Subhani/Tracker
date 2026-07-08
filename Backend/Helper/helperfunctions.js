const crypto = require("crypto");
const SessionModel = require("../Models/Sessions_model.js")
const usermodel = require("../Models/User_model.js");
const OtpModel = require("../Models/OtpModel.js")
const { DecryptToken } = require("../Helper/JwtToken.js")
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
    else VerifyUser.Verify(res, entry);
    return entry;
  }
}
class VerifyUser {
  static Verify(res, obj) {
    if (!obj.verified) return ApiResponse.failure(res, "User NOt Verified !", 400);
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
class AuthForGettingAcces {
  static CheckForCookie(req, res) {
    const cookie = req.cookies.TempToken;
    if (!cookie) return ApiResponse.failure(res, "Didnt get the Token !", 500);
    else return cookie;
  }
  static async RevokeCheck(cookie, res) {
    const Hash = GetHash(cookie);
    const Particular_Session = await SessionModel.findOne({ RefreshHashToken: Hash, revoked: false })
    if (!Particular_Session) return ApiResponse.failure(res, "The Session is Revoked !!", 500);
    else return Particular_Session;
  }
}
class AuthForEveryAccess {
  static CheckBearer(req, res) {
    const token = req.headers['authorization'];
    if (token) return token = token.split(' ')[1];
    else return ApiResponse.failure(res, "didnt Get the Bearer Token !", 500);
  }
  static seeRevoke(res, obj) {
    if (obj.revoked) ApiResponse.failure(res, "You are Currently Logout !!", 500);
  }
  static async RevokeCheck(res, token) {
    const DecryptedObject = await DecryptToken(token);
    if (DecryptedObject) {
      seeRevoke(res, DecryptedObject)
      return DecryptedObject
    }
  }
}
const crypto = require('crypto');
const OTPP = crypto.randomInt(100000, 999999).toString();

class Otp_Helper {
  static async Check_OTP(hashedotp, email, res) {
    const entry = await OtpModel.findOne({ email: email, OTP: hashedotp });
    if (!entry) return ApiResponse.failure(res, "The Otp Expired !!", 400);
    else return entry;
  }
  static async CheckExpiry(obj, res) {
    const time_now = new Date.now();
    const TimeAtCreated = new Date(obj.createdAt);
    const period = (time_now - TimeAtCreated) / 1000 / 60;
    if (period > 5) {
      await OtpModel.deleteOne({ _id: obj._id });
      return ApiResponse.failure(res, "The Otp is expired !", 400);
    }
  }
  static async DeletOtp(obj) {
    await OtpModel.deleteOne({ _id: obj._id });
  }
}

module.exports = {
  GetHash,
  ApiResponse,
  AuthenticateSignUP,
  AuthenticateLogin,
  SendCookie,
  AuthForGettingAcces,
  AuthForEveryAccess,
  OTPP,
  Otp_Helper,
  VerifyUser,
}
