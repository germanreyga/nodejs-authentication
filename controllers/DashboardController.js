const { validationResult } = require("express-validator");

exports.dashboard = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash("errors", errors.array()[0]);
    return res.render("auth/register", {
      layout: "auth",
      errors: req.flash("errors")
    });
  } else {
    res.render("tools/dashboard", { user: req.user });
  }
};
