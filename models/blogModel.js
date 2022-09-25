const mongoose = require("mongoose");
const BlogPostModel = mongoose.Schema({
  title: String,
  PostTime: Date,
  descrption: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogUser",
  },
});
module.exports = mongoose.model("BlogPost", BlogPostModel);
