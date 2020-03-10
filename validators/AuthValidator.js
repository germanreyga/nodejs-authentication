// validators/AuthValidator.js
// Importamos express-validators para ayudarnos a implementar las reglas
// de validación
const { check } = require("express-validator");

exports.registerUser = [
  // Revisa que el nombre no sea vacío
  check("inputName").notEmpty(),
  // Revisa que el correo sea un mail
  check("inputEmail").isEmail(),
  // Revisa que el usuario sea basic o admin
  check("inputRole").custom((value, { req, loc, path }) => {
    if (value !== "basic" && value !== "admin") {
      throw new Error("User role not valid");
    } else {
      return value;
    }
  }),
  // Revisa que el password este definido
  check("inputPassword").notEmpty(),
  // Revisa que el password sea el mismo
  check("inputConfirmPassword").custom((value, { req, loc, path }) => {
    if (value !== req.body.inputPassword) {
      throw new Error("Passwords don't match");
    } else {
      return value;
    }
  })
];

exports.basicUser = [
  // Confirms if the user has a session with basic permissions
  check().custom((value, { req, loc, path }) => {
    if (typeof req.user === "undefined") {
      throw new Error("Non-registered users are not allowed in the dashboard");
    } else {
      return value;
    }
  })
];

exports.adminUser = [
  // Confirms if the user has a session with admin permissions
  check().custom((value, { req, loc, path }) => {
    if (typeof req.user === "undefined") {
      throw new Error("Non-registered users are not allowed in the user list");
    } else if (req.user.role != "admin") {
      throw new Error(403);
    } else {
      return value;
    }
  })
];
