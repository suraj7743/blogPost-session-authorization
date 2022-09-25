const catchAsync = require("./CatchAsync");
const AppError = require("./AppError");

module.exports = catchAsync(async (req, res, next) => {
  if (req.session && req.sessio.admin) {
    res.locals.admin = true;
    next();
  } else {
    return next(
      new AppError(
        "Sorry you are not authorize to visit the page login to proceed"
      )
    );
  }
});
