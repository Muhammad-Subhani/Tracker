const dotenv = require("dotenv");
dotenv.config();
if (!process.env.DATABASE_KEY) {
  throw new console.error("there is no Database key there !");
}
if (!process.env.PORT) throw new console.error("there is no port number ");
module.exports = {
  DATABASE_KEY: process.env.DATABASE_KEY,
  PORT: process.env.PORT,
}
