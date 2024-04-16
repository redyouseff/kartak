const asyncHandler = require("express-async-handler");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const appError = require("../utils/dummy/apiError");
const { use } = require("../routes/userRoute");
const jwt = require("jsonwebtoken");
const createToken = require("../utils/dummy/jwtFunction");
const sendEmail = require("../utils/dummy/email");

const login = asyncHandler(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new appError("email or password are not corrected", 500));
  }

  token = createToken(user._id);

  res.status(200).json({ status: "success", Data: user, token: token });
});

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new appError("you are not logged in", 500));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await userModel.findById(decoded.userId);
  const currentUser = user;

  if (!user) {
    return next(new appError("user is no longer exist "));
  }

  req.currentUser = currentUser;
  next();

});
const forgetPassword = asyncHandler(async (req, res, next) => {

  // ! 1-get the user from mongodb database (comment)

  const user = await userModel.findOne({ email: req.body.email })
  console.log("user=>",user);
  if (!user) {
    const error = new appError("we con not find the user with the given email", 404)
    next(error)
    // ?  return next(new appError("no users on this email")) (try this comment)
  }


  // ! 2-generate rondom reset token (comment)

  const resetToken = user.createResetPasswordToken()
  console.log("reset token :" + resetToken)
  await user.save()

  // ! 3-send email to the user with the rondom token (comment)

  const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetPassword/${resetToken}`
  const message = `we have recieve password reset req ,use the below link\n\n${resetUrl}`
  try {
  await sendEmail({
    email: user.email,
    subject: 'password change req ',
    message: message,
  })
  console.log("send email : ", sendEmail)
  res.status(200).json({
    status: 'success',
    message: 'password reset link send to the user'
  })
  } catch (err) {
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    user.save();
    return next(new ("there is an error in sending an email"), 500)
  }

});
const resetPassword = asyncHandler(async (req, res, next) => {

})
module.exports = {
  login,
  protect,
  forgetPassword,
  resetPassword
};
