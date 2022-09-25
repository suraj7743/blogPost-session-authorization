const catchAsync = require("../util/CatchAsync");
const AppError = require("../util/AppError");
const BlogUser = require("../models/user");
const BlogPost = require("../models/blogModel");
const getArticles = (req, res, next) => {
  res.send("this is showing article page for user ");
};

const postArticles = catchAsync(async (req, res, next) => {
  const { title, description } = req.body;
  const BlogPost = new BlogPost({
    title,
    description,
    user: req.session.user._id,
    PostTime: Date.now(),
  });
  const data = await BlogPost.save();
  res.status(200).json({
    status: "message",
    data,
  });
});
module.exports = {
  getArticles,
  postArticles,
};
