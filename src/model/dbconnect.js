const mysql = require('mysql');
var options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
}

const db = mysql.createPool(options);
console.log(options);


exports.db = db;