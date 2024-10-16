const jwt = require("jsonwebtoken");
const { sendErrorResponse } = require("./errorHandle");
const User = require("../schema/UserSchema");

exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return sendErrorResponse(res, 401, "Login first to access resources");
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded || !decoded._id) {
      return sendErrorResponse(res, 401, "Invalid token or token has expired");
    }

    const user = await User.findById(decoded._id);
    // console.log(user)
    if (!user) {
      return sendErrorResponse(res, 404, "User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};
