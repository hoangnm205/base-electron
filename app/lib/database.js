const mysql = require("mysql");
let connection;

exports.connectDB = function (param) {
    // Add the credentials to access your database
    return new Promise((resolve, reject) => {

        connection = mysql.createConnection({
            host: param.host,
            user: param.user_name,
            password: param.password,
            database: param.db_name,
            port: param.port
        });
        // connect to mysql
        connection.connect((err) => {
            // in case of error
            if (err) {
                console.log(err.code);
                console.log(err.fatal);

                reject(err);
            }
            resolve(connection);
        });
    });
};

exports.querryUsers = function () {
    // Perform a query
    $query = " SELECT `user_name`, `user_password` FROM `user` LIMIT 10";
    return new Promise((resolve, reject) => {
        connection.query($query, (err, rows, fields) => {
            if (err) {
                console.log("An error ocurred performing the query.");
                console.log(err);
                reject(err);
            }
            resolve(rows);
        });
    });
};

exports.closeConnection = function () {
    if (connection) {
        connection.end((err) => {
            if (err) {
                console.log('Error ocurred when closing connection');
            }
        });
    }else{
        console.log('No connection to close');
    }
};
