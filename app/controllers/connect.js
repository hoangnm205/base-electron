const connect_model = require('../models/connect_model');
const login = require('./login');

let renderFail = function(req, res){
    res.render("connect", { fail: true });
}

exports.render = function(req, res){
    res.render("connect", { fail: false });
}

exports.connectDB = function(req, res){
    let connectParam = req.body;
    connect_model.connectDatabase(connectParam).then(() => {
        login.render(req, res);
    }).catch(() => {
        renderFail(req, res);
    });
}
