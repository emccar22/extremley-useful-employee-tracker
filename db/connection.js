const mysql = require('mysql2');
require('dotenv').config();

// Connect to database
const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: procces.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME
    },
    console.log('Connected to the employee database.')
);

module.exports = db;