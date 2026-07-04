const dotenv = require("dotenv");
dotenv.config();
if (!process.env.DATABASE_KEY) {
  throw new console.error("there is no Database key there !");
}
if (!process.env.PORT) throw new console.error("there is no port number ");
if (!process.env.JWT_TOKEN) throw new console.error("There is no JWT key !");
module.exports = {
  DATABASE_KEY: process.env.DATABASE_KEY,
  PORT: process.env.PORT,
  JWT_TOKEN: process.env.JWT_TOKEN,
}
