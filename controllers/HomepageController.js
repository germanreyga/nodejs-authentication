exports.index = (req, res) => {
  if (typeof req.user === "undefined") {
    res.render("homepage/index");
  } else {
    res.render("homepage/index", { user: req.user });
  }
};
