const express = require("express");
const UserController = require("../controller/userController");
const userRoutes = express.Router();

userRoutes.post("/login", UserController.Login);
userRoutes.post("/register", UserController.Register);
userRoutes.get("/getBooks", UserController.getBooks);
userRoutes.post("/addBook", UserController.addBook);
userRoutes.post("/updateBook", UserController.updateBook);

module.exports = userRoutes;
