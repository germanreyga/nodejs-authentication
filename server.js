let express = require("express");
let app = express();
let webRoutes = require("./routes/web");
let bodyParser = require("body-parser");
/**
 * Configurations
 */

let passport = require("passport");
require("./configs/passport");
let appConfig = require("./configs/app");
let cookieParser = require("cookie-parser");
let session = require("express-session");
let flash = require("express-flash");
let sessionStore = new session.MemoryStore();
// Views engine
let exphbs = require("express-handlebars");
// Imports a set of helpers for handlebars
// https://github.com/helpers/handlebars-helpers
let hbshelpers = require("handlebars-helpers");
let multihelpers = hbshelpers();
const extNameHbs = "hbs";
let hbs = exphbs.create({
  extname: extNameHbs,
  helpers: multihelpers
});
app.engine(extNameHbs, hbs.engine);
app.set("view engine", extNameHbs);
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: "true",
    secret: appConfig.secret
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
/**
 * Routes
 */
app.use("/", webRoutes);

/**
 * App Init
 */
app.listen(appConfig.expressPort, () => {
  console.log(
    `Server is listenning on ${appConfig.expressPort}! (http://localhost:${appConfig.expressPort})`
  );
});
