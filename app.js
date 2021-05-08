if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const connection = require('./config/db');
var cors = require('cors');

// routes
const games = require('./routes/api/games');

const app = express();

// Connect Database
if (process.env.NODE_ENV !== 'test') {
  connection.dbconnect();
}


// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));


// use routes
app.use('/api/games', games);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;