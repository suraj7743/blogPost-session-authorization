const express = require("express");
const Router = express();
const RestApiController = require("../controller/RestApiController");
const auth = require("../util/auth");

Router.all("/api", auth);
Router.get("/api/articles", RestApiController.getArticles);
Router.post("/api/articles", RestApiController.postArticles);

module.exports = Router;
