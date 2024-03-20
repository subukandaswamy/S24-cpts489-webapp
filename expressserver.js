const express = require("express");
const { currentTime } = require("./time");
const bodyParser = require("body-parser");
const session = require("express-session");
const secureRouter = require("./secureRouter");
const path = require("path");
const runQuery = require("./db");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("static"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "cpts489",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.get("/time.dy", (req, res) => {
  res.send(currentTime());
});

function validateUser(username, password, sCallback, fCallback) {
  console.log(username, password);
  const queryString = "SELECT * FROM USER WHERE name=? AND password=?";
  const values = [username, password];
  runQuery(queryString, values, function (err, res) {
    console.log(err);
    console.log(res);
    if (err) {
      throw err;
    }
    if (res.length > 0) {
      sCallback(res[0]);
    } else {
      fCallback();
    }
  });
}

app.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const sCallback = function (row) {
    req.session.user = {
      name: row.name,
      balance: row.balance,
    };
    res.redirect("/home.html");
  };
  const fCallback = function () {
    res.redirect("/fail.html");
  };
  validateUser(username, password, sCallback, fCallback);
  //console.log(user);
  // if (user) {
  //   req.session.user = user;
  //   res.redirect("/home.html");
  // } else {
  //   res.redirect("/fail.html");
  // }
});

app.use("/secure", secureRouter);

app.listen(3000, () => {
  console.log("server started in port 3000");
});
