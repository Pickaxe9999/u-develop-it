const mysql = require('mysql2');

//Connect to the MySQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //Your sql username
        user: 'root',
        //Your sql password
        password: 'Kingdom_01',
        database:'election'
    },
    console.log('Connected to the Database.')
)

module.exports = db;