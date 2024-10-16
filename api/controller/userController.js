const User = require("../schema/UserSchema");
const validator = require("validator");
const { sendErrorResponse } = require("../middleware/errorHandle");
const { response } = require("../app");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) return sendErrorResponse(res, 400, "Name is required");
    if (!email) return sendErrorResponse(res, 400, "Email is required");
    if (!password) return sendErrorResponse(res, 400, "Password is required");
    if (!validator.isEmail(email))
      return sendErrorResponse(res, 400, "Invalid email");
    if (password.length < 8) {
      return sendErrorResponse(
        res,
        400,
        "Password must be at least 8 characters"
      );
    }

    let user = await User.findOne({ email });
    if (user) return sendErrorResponse(res, 400, "This email is in use. Use another one or try to login with the same email");

    // Create a new user with the provided information
    user = await User.create({
      name,
      email,
      password,
    });

    // Generate a token for the new user
    const token = user.generateToken();

    // Set cookie options for the token
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    // Respond with success and user information, along with the token in a cookie
    res.status(200).cookie("token", token, options).json({
      success: true,
      message: "Registered Successfully",
      user:{id:user._id, name: user.name, email: user.email},
    });
  } catch (error) {
    // Handle any errors that occur during the registration process
    sendErrorResponse(res, 500, error.message);
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) return sendErrorResponse(res, 400, "Email is required");
    if (!password) return sendErrorResponse(res, 400, "Password is required");
    const user = await User.findOne({ email });
    if (!user) return sendErrorResponse(res, 404, "User not found");
    if (!validator.isEmail(email))
      return sendErrorResponse(res, 400, "Invalid Email");
    const isPasswordMatch = await user.matchPassword(password);
    if (!isPasswordMatch)
      return sendErrorResponse(res, 401, "Invalid password");
    let { token } = req.cookies;
    if (token) return sendErrorResponse(res, 400, "you are already logged in");
    token = user.generateToken();
    const options = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.status(200).cookie("token", token, options).json({
      success: true,
      message: "Loggedin Successfully",
      user:{id:user._id, name: user.name, email: user.email},
    });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

exports.logoutUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return sendErrorResponse(res, 401, "you are already logged out");
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()) })
      .json({
        success: true,
        message: "Logged Out successfully",
      });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return sendErrorResponse(res, 404, "User not found");
    res.status(200).json({
      success: true,
      user:{id:user._id, name: user.name, email: user.email},
    });
  } catch (error) {
    sendErrorResponse(res, 500, error.message)
  }
}
