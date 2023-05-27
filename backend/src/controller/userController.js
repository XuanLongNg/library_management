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
      const data = {
        ...req.body,
      };
      const authenticate = await mysqlServices.authenticate(data);
      if (authenticate) {
        const userData = await mysqlServices.getUser(data);
        return res.send({ message: "Login complete", id: userData.id });
      }
      return res.send({ message: "Login failed" });
    } catch (err) {
      console.log("Error: ", err);
      res.status(404).send({ message: "Server internal error" });
    }
  }
  async Register(req, res) {
    try {
      const data = {
        ...req.body,
      };
      const hasUser = await mysqlServices.hasUser(data);

      if (hasUser) {
        return res.send({ message: "User exits" });
      } else {
        await mysqlServices.addUser(data);
        return res.send({ message: "Register complete" });
      }
    } catch (err) {
      console.log("Error: ", err);
      res.status(404).send({ message: "Server internal error" });
    }
  }
  async getBooks(req, res) {
    try {
      const data = {
        ...req.body,
      };
      const booksData = await mysqlServices.getBooks(data);
      return res.status(200).send(booksData);
    } catch (error) {
      console.log("Error: ", error);
      res.status(404).send({ message: "Server internal error" });
    }
  }
  async addBook(req, res) {
    try {
      const data = {
        ...req.body,
      };
      await mysqlServices.addBook(data);
      return res.status(200).send({ message: "Success" });
    } catch (error) {
      console.log("Error: ", error);
      res.status(404).send({ message: "Server internal error" });
    }
  }
  async updateBook(req, res) {
    try {
      const data = {
        ...req.body,
      };
      await mysqlServices.updateBook(data);
      return res.status(200).send({ message: "Success" });
    } catch (error) {
      console.log("Error: ", error);
      res.status(404).send({ message: "Server internal error" });
    }
  }
}

module.exports = new UserController();
