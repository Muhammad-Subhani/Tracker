const express = require("express");
const { PORT, DATABASE_KEY } = require("./server.js")
const { ConnectToDatabase } = require("./Connections/connect.js")
const morgan = require("morgan");
const cookieParser = require("cookie-parser")
const { auth_router } = require("./Routes/auth_router.js");
const { Tracker_Router } = require("./Routes/Tracker_routes.js")
const { transporter } = require("./Controller/transporter.js")
const app = express();
//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extends: true }))
app.use(morgan("dev"));
ConnectToDatabase(DATABASE_KEY).
  then(console.log("Connected to database !!"))
  .catch((err) => console.log(err));
// routes 
app.use("/Auth", auth_router);
app.use("/api", Tracker_Router);
// listenning 
app.listen(PORT, () => console.log(`app is curently being listened on port ${PORT}`))

