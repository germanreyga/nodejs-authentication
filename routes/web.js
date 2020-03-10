let router = require("express").Router();
let homepageController = require("../controllers/HomepageController");
let authController = require("../controllers/AuthController");
let dashboardController = require("../controllers/DashboardController");
let authValidator = require("../validators/AuthValidator");
let passport = require("passport");

router.get("/", homepageController.index);
router.get("/login", authController.login);
router.get("/register", authController.register);
router.get("/logout", authController.logout);
router.post(
  "/registerUser",
  authValidator.registerUser,
  authController.registerUser
);

router.get(
  "/dashboard",
  authValidator.basicUser,
  dashboardController.dashboard
);
router.post(
  "/loginUser",
  passport.authenticate("local", {
    successRedirect: "/dashboard" /*,
    failureRedirect: "/login"*/
  })
);
router.get("/*", homepageController.index);

module.exports = router;
