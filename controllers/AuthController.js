const { validationResult } = require("express-validator");
let UserModel = require("../models/User");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  res.render("auth/login", { layout: "auth" });
};

exports.logout = (req, res) => {
  req.logout();
  res.render("auth/login", { layout: "auth" });
};

exports.register = (req, res) => {
  res.render("auth/register", {
    layout: "auth",
    errors: req.flash("errors")
  });
};

exports.registerUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array());
    return res.redirect("back");
  }

  name = req.body.inputName;
  email = req.body.inputEmail;
  role = req.body.inputRole;
  password = req.body.inputPassword;
  hashedPass = bcrypt.hashSync(password, 10);

  UserModel.createUser(name, email, role, hashedPass)
    .then(data => {
      res.render("auth/login", { layout: "auth", errors: req.flash("errors") });
    })
    .catch(error => console.log(error));
};
