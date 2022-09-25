const express = require("express");
const Router = express();
const RestApiController = require("../controller/RestApiController");
const auth = require("../util/auth");

Router.get("/api/articles", auth, RestApiController.getArticles);
Router.post("/api/articles", auth, RestApiController.postArticles);

module.exports = Router;
