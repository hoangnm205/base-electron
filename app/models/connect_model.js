const database = require('../lib/database');
exports.connectDatabase = function(connectParam){
    return database.connectDB(connectParam);
}