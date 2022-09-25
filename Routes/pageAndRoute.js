const express = require("express");
const Router = express();
const pageAndRouteController = require("../controller/pagesController");

Router.get("/", pageAndRouteController.getIndex);
Router.get("/register", pageAndRouteController.getRegister);
Router.post("/register", pageAndRouteController.PostRegister);
Router.get("/login", pageAndRouteController.getLogin);
Router.post("/login", pageAndRouteController.PostLogin);

module.exports = Router;
