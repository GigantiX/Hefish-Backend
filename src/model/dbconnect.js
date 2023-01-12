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
const db = mysql.createPool(options);
console.log(options);
exports.db = db;