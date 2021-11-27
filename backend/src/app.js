const express = require("express");
const routes = require("./api/routes");
const bodyParser = require("body-parser");
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/api", routes);

module.exports = app;