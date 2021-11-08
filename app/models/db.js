const dbConfig = require("../config/db.config.js");
const Pool = require("pg").Pool;

const pool = new Pool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
});

module.exports = pool;
