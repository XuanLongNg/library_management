const bcrypt = require("bcrypt");
export default class Hashing {
  constructor() {
    this.saltRound = 10;
  }
  async hash(plaintext) {
    const result = await bcrypt.hash(plaintext, this.saltRound);
    return result;
  }
  async compare(plaintext, textDB) {
    const result = await bcrypt.compare(plaintext, textDB);
    return result;
  }
}
