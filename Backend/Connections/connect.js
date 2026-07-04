const mongoose = require("mongoose");
async function ConnectToDatabase(key) {
  return mongoose.connect(key);
}
module.exports = { ConnectToDatabase, }
