const express = require("express");
const bodyParser = require("body-parser");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("express-jwt");
const cookieParser = require("cookie-parser");
const ProtectedRoutes = express.Router();

// const config = require('./app/config/jwtconfig');
const Authenticate = require("./app/models/authenticate");

const app = express();

ensureAuthenticated = (req, res, next) => {
  Authenticate.getToken(req.cookies.token, (err, data) => {
    if (err) res.jsonp([]);
    if (!data) {
      res.jsonp([]);
    }
    if (req.cookies.token === data.token) return next();
    else res.jsonp([]);
  });
};

app.use(cookieParser());
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/location/province")(app, ensureAuthenticated, "location");
require("./app/routes/location/district")(app, ensureAuthenticated, "location");
require("./app/routes/location/ward")(app, ensureAuthenticated, "location");
// require("./app/routes/classification/category")(app, ensureAuthenticated, "classification");
// require("./app/routes/classification/typeGroup")(app, ensureAuthenticated, "classification");
// require("./app/routes/classification/type")(app, ensureAuthenticated, "classification")
require("./app/routes/authenticate")(app, "user");
require("./app/routes/profile")(app, ensureAuthenticated, "user");

// set port, listen for requests
app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});
