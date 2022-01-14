const pool = require("./pool");

const queryWithDisposableConnection = async (sqlQuery) => {
  return pool
    .then((p) => p.getConnection())
    .then((connection) => connection.query(sqlQuery))
    .then((rows) => rows);
};

//General method to post to database
module.exports.postUpdateDatabase = async (data) => {
  const setValues = [];
  for (let i = 0; i < data.setvalues.length; i++) {
    setValues.push(data.setvalues[i]);
  }
  let whereString = "";
  if (data.where) {
    const whereObject = [];
    for (let w = 0; w < data.where.length; w++) {
      whereObject.push(`${data.where[w].key}=${data.where[w].value}`);
    }
    whereString = `WHERE ${whereObject.join(" AND ")}`;
  }
  const query = `UPDATE ${data.tableName} SET ${setValues.join(
    ","
  )} ${whereString}`;
  return queryWithDisposableConnection(query);
};

//General method to post to database
module.exports.postInsertDatabase = async (data) => {
  const setValues = [];
  for (let i = 0; i < data.setvalues.length; i++) {
    setValues.push(`${data.setvalues[i]}`);
  }
  const query = `INSERT INTO ${data.tableName} VALUES (${setValues.join(",")})`;
  return queryWithDisposableConnection(query);
};

//General method to get from database
module.exports.getFromDatabase = async (tableName, where) => {
  let whereString = "";
  if (where !== "") {
    whereString = `WHERE ${where
      .replace(/-is-/g, "=")
      .replace(/-and-/g, " AND ")}`;
  }
  const query = `SELECT * FROM ${tableName} ${whereString}`;
  return queryWithDisposableConnection(query);
};

//General method to delete from database
module.exports.deleteFromDatabase = async (data) => {
  let whereString = "";
  if (data.where) {
    const whereObject = [];
    for (let w = 0; w < data.where.length; w++) {
      whereObject.push(`${data.where[w].key}=${data.where[w].value}`);
    }
    whereString = `WHERE ${whereObject.join(" AND ")}`;
  }
  const query = `DELETE FROM ${data.tableName} ${whereString}`;
  return queryWithDisposableConnection(query);
};
