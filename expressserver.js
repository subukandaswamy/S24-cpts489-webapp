const express = require("express");
const { currentTime } = require("./time");
const bodyParser = require("body-parser");
const session = require("express-session");
const secureRouter = require("./secureRouter");
const path = require("path");

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

app.use("/secure", secureRouter);

app.listen(3000, () => {
  console.log("server started in port 3000");
});
