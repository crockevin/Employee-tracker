const mysql = require('mysql2')
require('dotenv').config();

const db = mysql.createConnection(
{
    host: 'localhost',
    user: 'root',
    password: 'KuroRakko1!',
    database: 'employee_db'
}
);

module.exports = db;