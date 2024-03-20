const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "subu",
  password: "mysql",
  database: "bank",
});

connection.connect();

function runQuery(queryString, values, callback) {
  connection.query(queryString, values, callback);
  //connection.end();
}

module.exports = runQuery;
