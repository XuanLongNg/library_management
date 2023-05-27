const express = require("express");
const mysqlServices = require("../services/mysqlServices");
class UserController {
  constructor() {}

  static getInstance() {
    const controller = new UserController();
    return controller;
  }
  async isLogin(req, res, next) {
    if (req.session.user === req.body.id) {
      return res.send({ message: "logged" });
    } else {
      return res.send({ message: "not logged in" });
    }
  }
  async Login(req, res) {
    try {
      const account = {
        ...req.body,
      };
      const hasUser = await mysqlServices.hasUser({ id: req.body.id });
      console.log(ha);
      // const isCorrect = await firebaseService.authentication(account);
      // if (isCorrect) {
      //   const user = await firebaseService.getUserByUsername(account);
      //   req.session.user = user.id;
      //   return res.send({ message: "Login complete", id: req.session.user });
      // }
      return res.send({ message: "Login failed" });
    } catch (err) {
      console.log("Error: ", err);
      res.status(404).send({ message: "Server internal error" });
    }
  }
  async Register(req, res) {
    try {
      const account = {
        ...req.body,
      };
      const hasUser = await firebaseService.hasUser(account);

      if (hasUser) {
        return res.send({ message: "User exits", data: account });
      } else {
        await firebaseService.addUser(account);
        return res.send({ message: "Register complete" });
      }
    } catch (err) {
      console.log("Error: ", err);
      res.status(404).send({ message: "Server internal error" });
    }
  }
}

module.exports = new UserController();
