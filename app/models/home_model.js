const database = require('../lib/database');
exports.closeConnection = function () {
    database.closeConnection();
}