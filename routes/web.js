let router = require("express").Router();
let homepageController = require("../controllers/HomepageController");
let authController = require("../controllers/AuthController");
let authValidator = require("../validators/AuthValidator");
let passport = require("passport");

router.get("/", homepageController.index);

router.get("/login", authController.login);
router.get("/register", authController.register);
router.post(
  "/registerUser",
  authValidator.registerUser,
  authController.registerUser
);
router.post(
  "/loginUser",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

/*
router.get("/protected", (req, res) => {
  console.log("Usuario logueado con éxito");
  res.send("Usuario logueado con éxito");
});
router.get("/login-fail", (req, res) => {
  console.log("El usuario no tiene una sesión válida");
  res.send("El usuario no tiene una sesión válida");
});*/

module.exports = router;
