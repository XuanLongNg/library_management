const mysql = require("mysql2");
const MysqlConfig = require("../configs/mysqlConfig");
const Hashing = require("../utils/hashing");
class MysqlServices {
  constructor() {}
  async hasUser({ username }) {
    const query = `select id from user where username = '${username}'`;
    console.log(query);
    const [data] = await MysqlConfig.promise().query(query);
    console.log("Data: ", data);
    if (data.length > 0) {
      return true;
    }
    return false;
  }
  async getUser({ username }) {
    const query = `select * from user where username = '${username}'`;
    console.log(query);
    const [data] = await MysqlConfig.promise().query(query);
    console.log("Data: ", data);
    if (data.length > 0) {
      return data[0];
    }
    return undefined;
  }
  async authenticate({ username, password }) {
    const userData = await this.getUser({ username });
    const hash = await Hashing.hash(password);
    console.log(hash);
    if (userData) {
      const compare = await Hashing.compare(password, userData.password);
      if (compare) return true;
    }
    return false;
  }
  async addUser({ name, username, password, email, role }) {
    const query =
      "insert into user(name, username, password, email,role)" +
      `values ("${name}","${username}","${password}", "${email}", "${role}");`;
    await MysqlConfig.promise().query(query);
  }
  async getBooks() {
    const query = `select * from book`;
    console.log(query);
    const [data] = await MysqlConfig.promise().query(query);
    console.log("Data: ", data);
    return data;
  }
  async getBook({ id }) {
    const query = `select * from book where id = ${id}`;
    console.log(query);
    const [data] = await MysqlConfig.promise().query(query);
    console.log("Data: ", data);
    if (data.length > 0) return data[0];
    return undefined;
  }
  async addBook({
    title,
    author,
    description,
    nop,
    category,
    image,
    release_date,
  }) {
    const query =
      "insert into book(title, author, description, nop,category, image, release_date) " +
      `values ("${title}","${author}","${description}", ${nop}, "${category}", "${image}", "${release_date}");`;
    await MysqlConfig.promise().query(query);
  }
  async updateBook({
    id,
    title,
    author,
    description,
    nop,
    category,
    image,
    release_date,
  }) {
    const query =
      "update book " +
      `set title = "${title}", author = "${author}", description = "${description}", nop = ${nop}, category = "${category}", image ="${image}", release_date = "${release_date}"` +
      ` where id = "${id}"`;
    await MysqlConfig.promise().query(query);
  }
  async deleteBook({ id }) {
    let query = `delete from feedback where id_item like ${id};`;
    await MysqlConfig.promise().query(query);
    query = `delete from item where id = ${id};`;
    await MysqlConfig.promise().query(query);
    query = `delete from book where id = ${id};`;
    await MysqlConfig.promise().query(query);
  }
  async addItem({ id, for_sale, cost, purchase_price, rent_price, quantity }) {
    const query =
      "insert into item(id, for_sale, cost, purchase_price,rent_price, quantity) " +
      `values (${id},${for_sale},${cost}, ${purchase_price}, ${rent_price}, ${quantity});`;
    await MysqlConfig.promise().query(query);
  }
  async updateItem({
    id,
    for_sale,
    cost,
    purchase_price,
    rent_price,
    quantity,
  }) {
    const query =
      "update item " +
      `set for_sale = ${for_sale},cost = ${cost}, purchase_price =${purchase_price}, rent_price = ${rent_price}, quantity =${quantity}` +
      ` where id = ${id}`;
    await MysqlConfig.promise().query(query);
  }
}
module.exports = new MysqlServices();
