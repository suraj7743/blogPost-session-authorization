const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MongoDbStore = require("connect-mongodb-session")(session);
const pageAndRoute = require("./Routes/pageAndRoute");
const ApiRoute = require("./Routes/ApiRoute");
const e = require("express");

const url = "mongodb://localhost:27017/blog";
mongoose
  .connect(url)
  .then(() => {
    console.log("mongodb connected ");
  })
  .catch((err) => {
    console.log(err.message);
  });
const store = new MongoDbStore({
  uri: url,
  collection: "session",
});
store.on("error", function (error) {
  console.log(error);
});
app.use(
  session({
    secret: "some-secret_key ",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  res.status(200).send("hello world this is main page ");
});
app.use("/", pageAndRoute);
app.use("/", ApiRoute);
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.statusCode || 500).json({
    status: err.status || "fail",
    message: err.message || "Internal server error",
  });
});
app.listen(8000, () => {
  console.log("connected to server ");
});
