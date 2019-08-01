const login_model = require('../models/login_model');
const home = require('./home');

exports.render = function (req, res) {
    res.render("login", { fail: false });
}

exports.login = function (req, res) {
    let login_entry = req.body;
    
    login_model.querryUsers().then((users) => {
        const isValidate = validateUser(login_entry, users);
        if (isValidate) {
            home.render(req, res);
        } else {
            renderFail(req, res);
        }
    }).catch(() => {
        console.log('Error when query users');
    });
}

let renderFail = function (req, res) {
    res.render("login", { fail: true });
}

let validateUser = function (login_entry, users) {
    return users.filter((user) => {
        return user.user_name == login_entry.user_name
            && user.user_password == login_entry.user_password;
    }).length > 0;
}