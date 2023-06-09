const express = require("express");
const url = require("node:url");
const querystring = require("querystring");
const UserController = require("../controller/userController");
const userRoutes = express.Router();

const getParams = (urlString) => {
  const requestUrl = url.parse(urlString);
  const queryString = requestUrl.query;
  const queryObject = querystring.parse(queryString);
  return queryObject;
};

userRoutes.post("/login", UserController.Login);
userRoutes.post("/register", UserController.Register);
userRoutes.get("/getName/:id", UserController.getNameById);

userRoutes.post("/addBook", UserController.addBook);
userRoutes.get("/getBooks", UserController.getBooks);
userRoutes.get("/getBook/:id", UserController.getBook);
userRoutes.post("/updateBook", UserController.updateBook);
userRoutes.get("/deleteBook/:id", UserController.deleteBook);

userRoutes.post("/addItem", UserController.addItem);
userRoutes.get("/getItem/:id", UserController.getItem);
userRoutes.post("/updateItem", UserController.updateItem);

userRoutes.post("/createBill", UserController.createBill);
userRoutes.post("/updateBill", UserController.updateBill);
userRoutes.get("/getBill/:id/user", UserController.getBillByUser);
userRoutes.get("/getBill/:id", UserController.getBillById);

userRoutes.post("/addFeedback", UserController.addFeedback);
userRoutes.get("/getFeedback/:id", UserController.getFeedback);
userRoutes.post("/updateFeedback", UserController.updateFeedback);
userRoutes.get("/deleteFeedback", (req, res) => {
  const queryObject = getParams(req.url);
  req.params.id_user = queryObject.id_user;
  req.params.id_item = queryObject.id_item;
  UserController.deleteFeedback(req, res);
});

module.exports = userRoutes;
