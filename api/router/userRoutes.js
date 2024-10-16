
const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  myProfile,
} = require("../controller/userController");
const { isAuthenticatedUser, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/me").get(isAuthenticatedUser, myProfile);

module.exports = router;
