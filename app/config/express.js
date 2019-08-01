const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const publicPath = path.resolve(__dirname, "../views");
const app_config = require('./app.config');

let e = express();

e.use(express.static(publicPath)); // express use the public path
e.use(bodyParser.urlencoded());

e.set("views", path.join(__dirname, "../views")); // Tells express where the parent of the /views folder is.
e.set("view engine", "ejs"); // set view engine

e.listen(app_config.port); // Tells express the local port to serve on!

exports.e = e;