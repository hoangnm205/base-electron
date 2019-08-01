/**
 * Created by Tung Ace on 6/26/2017.
 */
const index = require('../controllers/index');
const connect = require('../controllers/connect');
const login = require('../controllers/login');
const home = require('../controllers/home');

let e = require('../config/express').e;

e.get("/", index.render);

e.get("/connect", connect.render);

e.post("/connect", connect.connectDB);

e.post("/login", login.login);

e.get("/home", home.enterHome);

e.post("/home", home.exitHome);
