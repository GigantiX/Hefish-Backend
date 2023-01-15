const mysql = require('mysql');
var options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
}

var option2 = {
    host: "localhost",
    user: "root",
    password: "",
    database: "rest_api_test"
}

const db = mysql.createPool(option2);
console.log(option2);
exports.db = db;