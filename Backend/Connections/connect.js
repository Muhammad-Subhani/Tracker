const { DATABASE_KEY } = require("../server.js")
const mongoose = require("mongoose");
let cachedConnection;
async function ConnectToDatabase() {
  try {
    if (cachedConnection) return cachedConnection;
    cachedConnection = await mongoose.connect(DATABASE_KEY);
    return cachedConnection;
  } catch (err) {
    console.log(`errosr here ${err}`)
  }
  return mongoose.connect(DATABASE_KEY);
}
module.exports = { ConnectToDatabase, }
