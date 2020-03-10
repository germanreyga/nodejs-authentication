const { validationResult } = require("express-validator");
let UserModel = require("../models/User");

exports.userList = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstErr = errors.array()[0];
    req.flash("errors", firstErr);
    if (firstErr.msg == 403) {
      error = {
        status: 403,
        title: "Forbidden",
        message: "You don't have permission to access /users on this server"
      };
      res.status(403).render("errors/errorpage", {
        error: error,
        user: req.user
      });
    } else {
      res.render("auth/register", {
        layout: "auth",
        errors: req.flash("errors")
      });
    }
  } else {
    UserModel.findAll()
      .then(data => {
        res.render("tools/userlist", {
          list: data,
          user: req.user
        });
      })
      .catch(error => console.log(error));
  }
};
