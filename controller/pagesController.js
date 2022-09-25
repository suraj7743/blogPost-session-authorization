const catchAsync = require("../util/CatchAsync");
const AppError = require("../util/AppError");
const BlogUser = require("../models/user");
const bcrypt = require("bcrypt");

const getIndex = catchAsync(async (req, res, next) => {
  res.send("this is available for all user Homepage");
});

const getRegister = (req, res, next) => {
  res.send("this is Register page make register table ");
};
const PostRegister = catchAsync(async (req, res, next) => {
  const existUser = await BlogUser.find({
    email: req.body.email,
  });
  if (existUser) {
    return next(new AppError("user already exist Enter unique credentials "));
  }
  const { name, email, password } = req.body;
  const user = new BlogUser({
    name,
    email,
    password,
  });
  const data = await user.save();
  if (!data) {
    return next(new AppError("error saving in database", 400));
  }
  res.status(200).json({
    message: "data saved",
    data,
  });
});

const getLogin = (req, res, next) => {
  res.send("this is login page Make login table for frontend");
};

//post login
const PostLogin = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;
  const user = await BlogUser.findOne({ name: name });
  if (!user) {
    next(new AppError("Cannot find the user with provided again "));
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Password doesnot match invalid password ", 401));
  }
  req.session.admin = true;
  req.session.user = user;
  res.status(200).json({
    status: "success",
    messsage: "Session stored in database",
  });
});

module.exports = {
  getIndex,
  getRegister,
  PostLogin,
  PostRegister,
  getLogin,
};
