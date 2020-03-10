let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
let UserModel = require("../models/User");
let bcrypt = require("bcrypt");

const userTableFields = {
  usernameField: "inputEmail",
  passwordField: "inputPassword"
};

const verifyCallback = (inputEmail, inputPassword, done) => {
  UserModel.findByEmail(inputEmail)
    .then(user => {
      // Si no encuentra un usuario entonces regresa falso
      if (!user || user.length == 0) {
        return done(null, false);
      }
      // Si encuentra un usuario y coincide con la contraseña entonces
      // inicia la sesión

      let isValid = bcrypt.compareSync(inputPassword, user[0].password);
      if (isValid) {
        return done(null, user[0]);
      } else {
        return done(null, false);
      }
    })
    .catch(err => {
      done(err);
    });
};

const strategy = new LocalStrategy(userTableFields, verifyCallback);

passport.use(strategy);

// Guarda en las variables de sesión el id del usuario loggeado
passport.serializeUser((user, done) => {
  done(null, user.email);
});

// Cierra la sesión del usuario
passport.deserializeUser((id, done) => {
  UserModel.findByEmail(id)
    .then(user => {
      done(null, user[0]);
    })
    .catch(err => done(err));
});
