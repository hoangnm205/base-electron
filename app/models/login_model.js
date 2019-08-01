const database = require('../lib/database');
exports.querryUsers = function(){
    return database.querryUsers();
}