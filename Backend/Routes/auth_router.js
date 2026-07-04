const express = require("express");
const auth_router = express.Router();
const { SignupFunction } = require("../Controller/auth_control.js")
auth_router.post("/SignUP", SignupFunction);
auth_router.post("/Login", LoginFunction);
// auth_router.get("/GetToken", GetAccessToken);
// auth_router.get("/LogoutSelf", LogoutOneDevice);
// auth_router.get("/LogoutAll", LogoutAllDevices);
module.exports = {
  auth_router,
}
