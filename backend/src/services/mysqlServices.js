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
    password = await Hashing.hash(password);
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
    let query = `select id from book where title = '${title}' and author = '${author}'`;
    const [data] = await MysqlConfig.promise().query(query);
    if (data.length !== 0) return 0;
    query =
      "insert into book(title, author, description, nop,category, image, release_date) " +
      `values ("${title}","${author}","${description}", ${nop}, "${category}", "${image}", "${release_date}");`;
    await MysqlConfig.promise().query(query);
    query = "select MAX(id) as id from book";
    const [datatmp] = await MysqlConfig.promise().query(query);
    console.log("Get: ", datatmp[0].id);
    return datatmp[0].id;
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
    query = `delete from item where id like ${id};`;
    await MysqlConfig.promise().query(query);
    query = `delete from book where id = ${id};`;
    await MysqlConfig.promise().query(query);
  }
  async addItem({ id, status, cost, purchase_price, rent_price, quantity }) {
    const query =
      "insert into item(id, status, cost, purchase_price,rent_price, quantity) " +
      `values (${id},"${status}",${cost}, ${purchase_price}, ${rent_price}, ${quantity});`;
    const [data] = await MysqlConfig.promise().query(query);
    console.log(data);
  }
  async getItem({ id }) {
    const query = "select * from item" + ` where id = '${id}'`;
    const [data] = await MysqlConfig.promise().query(query);
    if (data.length > 0) return data[0];
    return undefined;
  }
  async updateItem({ id, status, cost, purchase_price, rent_price, quantity }) {
    const query =
      "update item " +
      `set status = "${status}",cost = ${cost}, purchase_price =${purchase_price}, rent_price = ${rent_price}, quantity =${quantity}` +
      ` where id = ${id}`;
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
  async createBill({
    id_user,
    id_item,
    time,
    time_start,
    time_end,
    money,
    status,
  }) {
    if (!time_start) time_start = null;
    else time_start = `"${time_start}"`;
    if (!time_end) time_end = null;
    else time_end = `"${time_end}"`;
    if (!money) money = null;
    else money = `"${money}"`;

    const query =
      "insert into bill (id_user, id_item, time, time_start, time_end, money, status)" +
      ` values(${id_user}, ${id_item}, "${time}", ${time_start}, ${time_end}, ${money}, "${status}")`;
    await MysqlConfig.promise().query(query);
  }
  async updateBill({
    id,
    id_user,
    id_item,
    time,
    time_start,
    time_end,
    money,
    status,
  }) {
    if (!time_start) time_start = null;
    else time_start = `"${time_start}"`;
    if (!time_end) time_end = null;
    else time_end = `"${time_end}"`;
    if (!money) money = null;
    else money = `"${money}"`;

    const query =
      "update bill" +
      ` set id_user = ${id_user}, id_item = ${id_item}, time = "${time}", time_start = ${time_start}, time_end = ${time_end}, money = ${money}, status = "${status}" ` +
      `where id = ${id}`;
    await MysqlConfig.promise().query(query);
  }
  async addFeedback({ id_user, id_item, time, star, comment }) {
    if (!comment) comment = null;
    else comment = `"${comment}"`;
    const query =
      "insert into feedback (id_user, id_item, time, star, comment)" +
      ` values(${id_user}, ${id_item}, "${time}", ${star}, ${comment})`;
    await MysqlConfig.promise().query(query);
  }
  async updateFeedback({ id_user, id_item, time, star, comment }) {
    if (!comment) comment = null;
    else comment = `"${comment}"`;
    const query =
      "update feedback" +
      ` set time = "${time}", star = ${star}, comment = ${comment} ` +
      `where id_user = ${id_user} and id_item = ${id_item} `;
    await MysqlConfig.promise().query(query);
  }
  async deleteFeedback({ id_user, id_item }) {
    const query =
      "delete from feedback " +
      `where id_user = ${id_user} and id_item = ${id_item} `;
    await MysqlConfig.promise().query(query);
  }
}
module.exports = new MysqlServices();
