const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const ErrorHandling = require("./middleware/error");

dotenv.config({ path: "config/config.env" });
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const cors = require("cors");
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));
// //importing routes
const user = require("./Router/userRoutes");

// //using routes
app.use("/api/v1/user", user);
//using error middlewares
app.use(ErrorHandling);

module.exports = app;