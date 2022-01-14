const mysql = require("promise-mysql");
const auth_data = require("../../auth_data");

const pool = mysql.createPool(
  Object.assign(auth_data.mysql_server, {
    connectionLimit: 500,
    multipleStatements: true,
  })
);

module.exports = pool;
