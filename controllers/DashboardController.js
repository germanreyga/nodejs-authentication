exports.index = (req, res) => {
  if (typeof req.user === "undefined") {
    res.render("auth/register", { layout: "auth", notallowed: true });
  } else {
    res.render("tools/dashboard", { user: req.user });
  }
};
