exports.index = (req, res) => {
  if (typeof req.user === "undefined") {
    console.log("BLALA");
    res.render("homepage/index");
  } else {
    console.log(req.user[0].email);
    res.render("homepage/index");
  }
};
