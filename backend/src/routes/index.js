const express = require("express");
const appRoutes = express.Router();
const userRoutes = require("./userRoutes");
appRoutes.use("/user", userRoutes);

module.exports = appRoutes;
