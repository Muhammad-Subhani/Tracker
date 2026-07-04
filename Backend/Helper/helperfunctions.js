const crypto = require("crypto");
function GetHash(val) {
  return crypto.createHash("sha512").update(val).digest("hex");
}
module.exports = {
  GetHash,
}
