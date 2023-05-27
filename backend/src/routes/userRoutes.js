const express = require("express");
const UserController = require("../controller/userController");
const userRoutes = express.Router();

userRoutes.post("/login", UserController.Login);
module.exports = userRoutes;
