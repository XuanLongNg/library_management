const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};
// console.log(config);
class MysqlConfig {
  constructor() {
    try {
      this.connection = mysql.createPool(config);
      console.log("connection database created");
      return this.connection;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
const mysqlConfig = new MysqlConfig();
module.exports = mysqlConfig;
