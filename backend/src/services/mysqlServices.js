const mysql = require("mysql2");
const MysqlConfig = require("../configs/mysqlConfig");
class MysqlServices {
  constructor() {}
  async hasUser({ id }) {
    const query = `select id from book` + ` where id = ${id}`;
    console.log(query);
    const [data] = await MysqlConfig.promise().query(query);
    console.log("Data: ", data);
    if (data.length > 0) {
      return true;
    }
    return false;
  }
}
module.exports = new MysqlServices();
