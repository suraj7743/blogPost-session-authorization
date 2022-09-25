const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = mongoose.Schema({
  name: {
    type: String,
    unique: [true, "must provide unique name"],
    required: [true, "name required"],
  },
  email: {
    type: String,
    required: [true, "Must input the email field "],
  },
  password: {
    type: String,
    min: 4,
    max: 10,
  },
});
UserModel.pre("save", function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash;
          next();
        });
      }
    });
    this.passwordChangedDate = Date.now() - 1000;
  } else {
    return next();
  }
});
module.exports = mongoose.model("BlogUser", UserModel);
