const dotenv = require("dotenv");
dotenv.config();
if (!process.env.DATABASE_KEY) {
  throw new Error("there is no Database key there !");
}
if (!process.env.PORT) throw new Error("there is no port number ");
if (!process.env.JWT_TOKEN) throw new Error("There is no JWT key !");
if (!process.env.OTP_KEY) throw new Error("there is no OTP service key !");
if (!process.env.GMAIL) throw new Error("There is no Gmail !!");
module.exports = {
  DATABASE_KEY: process.env.DATABASE_KEY,
  PORT: process.env.PORT,
  JWT_TOKEN: process.env.JWT_TOKEN,
  OTP_KEY: process.env.OTP_KEY,
  GMAIL: process.env.GMAIL,
}
