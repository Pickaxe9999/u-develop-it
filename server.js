const express = require('express');
const db = require('./db/connection.js');
const apiRoutes = require('./routes/apiRoutes');


const PORT = process.env.PORT || 3001;
const app = express();


//express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//api routes
app.use('/api', apiRoutes);


//default for if a requeest does not exist
app.use((req, res) => {
    res.status(404).end();
})

//confirmation of server starting
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });