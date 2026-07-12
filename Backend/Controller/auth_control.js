const usermodel = require("../Models/User_model.js");
const SessionModel = require("../Models/Sessions_model.js");
const OtpModel = require("../Models/OtpModel.js");
const { GetHash,
  ApiResponse,
  AuthenticateSignUP,
  AuthenticateLogin,
  SendCookie,
  AuthForGettingAcces,
  OTPP,
  Otp_Helper,
  VerifyUser } = require("../Helper/helperfunctions.js")

const { generateEmailTemplate } = require("../Helper/Emailstruct.js")
const { Get_Refresh_Token, Get_Access_token, DecryptToken } = require("../Helper/JwtToken.js")
const { sendEmail } = require("./transporter.js")

async function SignupFunction(req, res) {
  try {
    const { username, email, password } = req.body;
    const fields = AuthenticateSignUP.EmptyFields(username, email, password, res);
    if (!fields) return;
    const exists = await AuthenticateSignUP.AlreadyExisted(email, res);
    if (!exists) return;
    const ExistingUser = await AuthenticateSignUP.UserNotVerif(res, email);
    const Hash_Password = GetHash(password);
    console.log(`exists is ${exists}`)
    let result;
    if (exists != "userexists") {
      result = await usermodel.create({
        Name: username,
        email: email,
        password: Hash_Password,
        verified: false,
      });
    }
    const UserID = result ? result._id : ExistingUser._id;
    const UserEmail = result ? result.email : ExistingUser.email;
    // otp part 
    const otp = OTPP();
    const Hahs_OTP = GetHash(otp);
    const otp_entry = await OtpModel.create({
      User: UserID,
      email: UserEmail,
      OTP: Hahs_OTP,
    })
    const Email_html = generateEmailTemplate(otp);
    await sendEmail(email, "OTP Verification", `Your otp is ${otp}`, Email_html);
    return ApiResponse.success(res, "Successfully Created User Entry GO Validate !", 200, { username: result ? result.Name : ExistingUser.Name });
  }
  catch (err) {
    console.error("Error occured ", err)
    const errmessage = err.message || "unknown error"
    return ApiResponse.failure(res, errmessage, 500);
  }
}

async function LoginFunction(req, res) {
  try {
    const { email, password } = req.body;
    const fields = AuthenticateLogin.EmptyFields(email, password, res);
    if (!fields) return;
    const entry = await AuthenticateLogin.CheckUser(email, password, res);
    if (!entry) return;
    const verify = VerifyUser.Verify(res, entry)
    if (!verify) return
    const key = await Get_Refresh_Token(entry);
    const Hashed_RefToken = GetHash(key);
    const new_session = await SessionModel.create({
      User_id: entry._id,
      RefreshHashToken: Hashed_RefToken,
      revoked: false,
    });
    const Access_Token = await Get_Access_token(new_session);
    SendCookie(res, key);
    return ApiResponse.success(res, "Successfully Logged IN !", 200, { username: entry.Name, Token: key, Access: Access_Token })
  } catch (error) {
    console.error("Error :", error);
    const errmsg = error.message || "Unkown Error Occured !";
    return ApiResponse.failure(res, errmsg, 500);
  }
}
async function GetAccessToken(req, res) {
  const cookie = AuthForGettingAcces.CheckForCookie(req, res);
  if (!cookie) return;
  const sessionObject = await AuthForGettingAcces.RevokeCheck(cookie, res);
  if (!sessionObject) return;
  const userObject = await usermodel.findOne({ _id: sessionObject.User_id });
  const verify = VerifyUser.Verify(res, userObject);
  if (!verify) return;
  const key = await Get_Refresh_Token(userObject);
  const hash = GetHash(key);
  sessionObject.RefreshHashToken = hash;
  await sessionObject.save();
  const Access_Token = await Get_Access_token(sessionObject);
  SendCookie(res, key);
  return ApiResponse.success(res, "Revived Access Token ", 200, { username: userObject.Name, Token: key, Access: Access_Token })
}

async function LogoutOneDevice(req, res) {
  const cookie = AuthForGettingAcces.CheckForCookie(req, res);
  if (!cookie) return null;
  const sessionObject = await AuthForGettingAcces.RevokeCheck(cookie, res);
  if (!sessionObject) return;
  const Data = DecryptToken(cookie);
  if (Data.verified == false) return ApiResponse.failure(res, "You are not authorized !", 500);
  sessionObject.revoked = true;
  await sessionObject.save();
  return ApiResponse.success(res, "Successfully logout from one device", 200, { username: Data.Name }, 200);
  // ==g0 to the main landing page ==
}
async function LogoutAllDevices(req, res) {
  const cookie = req.cookies.TempToken;
  const sessionObject = await AuthForGettingAcces.RevokeCheck(cookie, res);
  if (!sessionObject) return;
  const data = DecryptToken(cookie);
  const verify = VerifyUser.Verify(res, data);
  if (!verify) return;
  await SessionModel.updateMany({ User_id: data._id }, { $set: { revoked: true } });
  ApiResponse.success(res, "Successfully Logout From all devices ", 200, { username: data.Name });
  // == go to main landing page ==
}
async function ValidateOtp(req, res) {
  try {
    const { email, otp } = req.body;
    const hahsed_otp = GetHash(otp);
    const obj = await Otp_Helper.Check_OTP(hahsed_otp, email, res);
    if (!obj) return;
    const check = await Otp_Helper.CheckExpiry(obj, res);
    if (!check) return;
    const ValidatedUser = await usermodel.findByIdAndUpdate(obj.User, {
      $set: {
        verified: true,
      }
    }, { new: true });
    if (!ValidatedUser) return ApiResponse.failure(res, "Failed to validate User !", 400);
    // making refresh token 
    const key = await Get_Refresh_Token(ValidatedUser);
    const Hashed_RefToken = GetHash(key);
    const session_res = await SessionModel.create({
      User_id: ValidatedUser._id,
      RefreshHashToken: Hashed_RefToken,
      revoked: false,
    });
    const Access_Token = await Get_Access_token(session_res);
    SendCookie(res, key);
    Otp_Helper.DeletOtp(obj);
    return ApiResponse.success(res, "Successfully Validated User !", 200, { username: ValidatedUser.Name, token: key, Access: Access_Token });
  }
  catch (error) {
    console.error("Error :", error);
    const errmsg = error.message || "Unkown Error Occured !";
    return ApiResponse.failure(res, errmsg, 500);
  }
}



// exporting all the functions 
module.exports = {
  SignupFunction,
  LoginFunction,
  GetAccessToken,
  LogoutOneDevice,
  LogoutAllDevices,
  ValidateOtp,
}
