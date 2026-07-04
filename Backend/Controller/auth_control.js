const usermodel = require("../Models/User_model.js");
const SessionModel = require("../Models/Sessions_model.js");
const mongoose = require("mongoose");
const { GetHash } = require("../Helper/helperfunctions.js")

class ApiResponse {
  static success(res, message, code, data) {
    return res.status(code).json({ status: message, data });
  }
  static failure(res, message, code) {
    return res.status(code).json({ status: message });
  }
}


async function SignupFunction(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return ApiResponse.failure(res, "there is some missing field !", 500);
    const Hash_Password = GetHash(password);
    const result = await usermodel.create({
      Name: username,
      email: email,
      password: Hash_Password,
      verified: false,
    });
    return ApiResponse.success(res, "Successfully Created User Entry !", 200, result);
  }
  catch (err) {
    console.error("Error occured ", err)
    const errmessage = err.message || "unknown error"
    return ApiResponse.failure(res, errmessage, 500);
  }
}








// exporting all the functions 
module.exports = {
  SignupFunction,
}
