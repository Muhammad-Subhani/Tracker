const usermodel = require("../Models/User_model.js");
const SessionModel = require("../Models/Sessions_model.js");
const { GetHash, ApiResponse, AuthenticateSignUP, AuthenticateLogin, SendCookie } = require("../Helper/helperfunctions.js")
const { Get_Refresh_Token, Get_Access_token } = require("../Helper/JwtToken.js")

async function SignupFunction(req, res) {
  try {
    const { username, email, password } = req.body;
    AuthenticateSignUP.EmptyFields(username, email, password, res);
    await AuthenticateSignUP.AlreadyExisted(email, res);
    const Hash_Password = GetHash(password);
    const result = await usermodel.create({
      Name: username,
      email: email,
      password: Hash_Password,
      verified: false,
    });

    // making refresh token 
    const key = await Get_Refresh_Token(result);
    const Hashed_RefToken = GetHash(key);
    const session_res = await SessionModel.create({
      User_id: result._id,
      RefreshHashToken: Hashed_RefToken,
      revoked: false,
    });
    const Access_Token = await Get_Access_token(session_res);
    SendCookie(res, key);
    return ApiResponse.success(res, "Successfully Created User Entry !", 200, { username: result.Name, Tokwn: key, Access: Access_Token });
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
    AuthenticateLogin.EmptyFields(email, password, res);
    const entry = AuthenticateLogin.CheckUser(email, res);
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
// async function GetAccessToken(req , res ){}







// exporting all the functions 
module.exports = {
  SignupFunction,
  LoginFunction,
}
