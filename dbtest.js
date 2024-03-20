const runQuery = require("./db");

const queryString = "SELECT * FROM USER WHERE name=? AND password=?";
const values = ["subu", "1234"];

const callback = function (err, res) {
  if (err) {
    throw err;
  }
  console.log(res);
};

runQuery(queryString, values, callback);
