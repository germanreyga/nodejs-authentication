let router = require("express").Router();
let homepageController = require("../controllers/HomepageController");
let authController = require("../controllers/AuthController");
let dashboardController = require("../controllers/DashboardController");
let adminController = require("../controllers/AdminController");
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

router.get("/users", authValidator.adminUser, adminController.userList);
router.get(
  "/dashboard",
  authValidator.basicUser,
  dashboardController.dashboard
);
router.post(
  "/loginUser",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
  })
);

module.exports = router;
