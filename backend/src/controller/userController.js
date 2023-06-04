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
      const booksData = await mysqlServices.getBooks();
      return res.status(200).send(booksData);
    } catch (error) {
      console.log("Error: ", error);
      res.status(404).send({ message: "Server internal error" });
    }
  }
  async getBook(req, res) {
    try {
      const id = req.params.id;
      const data = {
        ...req.body,
        id,
      };
      const bookData = await mysqlServices.getBook(data);
      if (bookData) return res.status(200).send(bookData);
      return res.status(200).send({ message: "book not found" });
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
      const id = await mysqlServices.addBook(data);
      console.log("Add book id: ", id);
      if (id != 0) return res.status(200).send({ message: "Success", id });
      return res.status(200).send({ message: "Book exits" });
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
  async deleteBook(req, res) {
    try {
      const id = req.params.id;
      console.log(id);
      await mysqlServices.deleteBook({ id });
      return res.status(200).send({ message: "Success" });
    } catch (error) {
      console.log("Error: ", error);
      res.status(404).send({ message: "Server internal error" });
    }
  }
  async addItem(req, res) {
    try {
      const data = {
        ...req.body,
      };
      await mysqlServices.addItem(data);
      return res.status(200).send({ message: "Success" });
    } catch (error) {
      console.log("Error: ", error);
      res.status(404).send({ message: "Server internal error" });
    }
  }
  async getItem(req, res) {
    try {
      const id = req.params.id;
      const data = {
        ...req.body,
        id,
      };
      const itemData = await mysqlServices.getItem(data);
      if (itemData) return res.status(200).send(itemData);
      return res.status(200).send({ message: "item not found" });
    } catch (error) {
      console.log("Error: ", error);
      res.status(404).send({ message: "Server internal error" });
    }
  }
  async updateItem(req, res) {
    try {
      const data = {
        ...req.body,
      };
      await mysqlServices.updateItem(data);
      return res.status(200).send({ message: "Success" });
    } catch (error) {
      console.log("Error: ", error);
      res.status(404).send({ message: "Server internal error" });
    }
  }
  async createBill(req, res) {
    try {
      const data = {
        ...req.body,
      };
      await mysqlServices.createBill(data);
      return res.status(200).send({ message: "Success" });
    } catch (error) {
      console.log("Error: ", error);
      res.status(404).send({ message: "Server internal error" });
    }
  }
  async updateBill(req, res) {
    try {
      const data = {
        ...req.body,
      };
      await mysqlServices.updateBill(data);
      return res.status(200).send({ message: "Success" });
    } catch (error) {
      console.log("Error: ", error);
      res.status(404).send({ message: "Server internal error" });
    }
  }
  async addFeedback(req, res) {
    try {
      const data = {
        ...req.body,
      };
      await mysqlServices.addFeedback(data);
      return res.status(200).send({ message: "Success" });
    } catch (error) {
      console.log("Error: ", error);
      res.status(404).send({ message: "Server internal error" });
    }
  }
  async updateFeedback(req, res) {
    try {
      const data = {
        ...req.body,
      };
      await mysqlServices.updateFeedback(data);
      return res.status(200).send({ message: "Success" });
    } catch (error) {
      console.log("Error: ", error);
      res.status(404).send({ message: "Server internal error" });
    }
  }
  async deleteFeedback(req, res) {
    try {
      console.log(req.params);
      const id_user = req.params.id_user;
      const id_item = req.params.id_item;

      // console.log(id);
      await mysqlServices.deleteFeedback({ id_user, id_item });
      return res.status(200).send({ message: "Success" });
    } catch (error) {
      console.log("Error: ", error);
      res.status(404).send({ message: "Server internal error" });
    }
  }
}

module.exports = new UserController();
