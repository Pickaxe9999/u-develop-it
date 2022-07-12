const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require('mysql2');

//express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

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

//return all the data in the candidates table
db.query('SELECT * FROM candidates', (err ,rows) => {
    console.log(rows);
})

//default for if a requeest does not exist
app.use((req, res) => {
    res.status(404).end();
})

//confirmation of server starting
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})