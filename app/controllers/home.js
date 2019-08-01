const home_model = require('../models/home_model');

exports.render = function(req, res){
    res.render('home');
}
exports.enterHome = function () {
    console.log('Login success. Enter home page');
}
exports.exitHome = function () {
    console.log('Close connection');    
    home_model.closeConnection();
}