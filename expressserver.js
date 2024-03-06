const express = require("express");
// const fs = require('fs')
const path = require("path");
const { currentTime } = require("./time");
const { Console } = require("console");

const app = express();

app.use(express.static("static"));

function validateUser(req, res, next) {
  console.log("user validated");
  next();
}

app.use(validateUser);

// app.get("/*.html", (req, res) => {
//   res.sendFile(path.join(__dirname, req.url));
// });

app.get("/time.dy", (req, res, next) => {
  res.send(currentTime());
  next();
});

app.get("*", (req, res) => {
  console.log(" Thank you bye bye");
});
// app.get("/sample", (req, res) => {
//   res.send("Sample");
// });

app.listen(3000, () => {
  console.log("server started in port 3000");
});
