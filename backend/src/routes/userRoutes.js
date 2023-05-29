const express = require("express");
const UserController = require("../controller/userController");
const userRoutes = express.Router();

userRoutes.post("/login", UserController.Login);
userRoutes.post("/register", UserController.Register);
userRoutes.get("/getBooks", UserController.getBooks);
userRoutes.get("/getBook/:id", UserController.getBook);
userRoutes.post("/addBook", UserController.addBook);
userRoutes.post("/updateBook", UserController.updateBook);
userRoutes.post("/updateBook", UserController.updateBook);
userRoutes.get("/deleteBook/:id", UserController.deleteBook);
userRoutes.post("/addItem", UserController.addItem);
userRoutes.post("/updateItem", UserController.updateItem);

module.exports = userRoutes;
