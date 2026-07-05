const JWT = require("jsonwebtoken");
const { JWT_TOKEN } = require("../server.js");

async function Get_Access_token(obj) {
  return JWT.sign({
    User_id: obj.User_id,
    Session_id: obj._id,
    RefreshHashToken: obj.RefreshHashToken,
    revoked: obj.revoked,
  }, JWT_TOKEN, { expiresIn: "15m" });
}

async function Get_Refresh_Token(obj) {
  return JWT.sign({
    User_id: obj._id,
    Name: obj.Name,
    email: obj.email,
    password: obj.password,
    verified: obj.verified
  }, JWT_TOKEN, { expiresIn: "7d" })
};

async function DecryptToken(token) {
  try {
    return JWT.verify(token, JWT_TOKEN);
  } catch (error) {
    console.error("error :", error);
    return null;
  }
}

module.exports = {
  Get_Access_token,
  Get_Refresh_Token,
  DecryptToken,
}
