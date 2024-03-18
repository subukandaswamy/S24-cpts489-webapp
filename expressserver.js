const express = require("express");
const { currentTime } = require("./time");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("static"));

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

function validateUser(username, password) {
  console.log(username, password);
  // I am looking up the database
  if (username === "subu" && password === "1234") {
    return {
      name: "subu",
      balance: 1000,
    };
  } else {
    return null;
  }
}

app.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const user = validateUser(username, password);
  //console.log(user);
  if (user) {
    req.session.user = user;
    res.redirect("/home.html");
  } else {
    res.redirect("/fail.html");
  }
});

function validateSecureUser(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/index.html");
  }
}

app.use("/secure", validateSecureUser);

app.get("/secure/balance", (req, res) => {
  //console.log(req.session.user);
  const { name, balance } = req.session.user;
  res.send(`<h1>${name} your balance is ${balance} dollars</h1>`);
});

app.listen(3000, () => {
  console.log("server started in port 3000");
});
