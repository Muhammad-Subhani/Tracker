const express = require("express")
const stats_router = express.Router();
const { FunctionValidation } = require("../middlewares/userVerification.js")
// base URL "/api/GetStats"
//stats_router.get("/" , FunctionValidation , fetchStats )

module.exports = { stats_router }
