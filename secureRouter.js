const express = require("express");
const router = express.Router();

function validateSecureUser(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/index.html");
  }
}

router.use(validateSecureUser);

router.get("/balance", (req, res) => {
  //console.log(req.session.user);
  const { name, balance } = req.session.user;
  //res.send(`<h1>${name} your balance is ${balance} dollars</h1>`);
  res.render("balance", { name, balance, data: ["A", "B", "C"] });
});

router.get("/another", (req, res) => {
  const name = req.session.user?.name;
  res.send(`<h3>This is another secure resource for ${name}</h3>`);
});

module.exports = router;
