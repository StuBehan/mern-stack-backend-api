// Set enviroment if not production, uses config from .env file
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Pull in express.js
const express = require('express');

// Pull in the db connection
const connection = require('./config/db');
const app = express();

// Pull in cors
var cors = require('cors');
app.use(cors({ origin: true, credentials: true }));

// Pull in all routes
const games = require('./routes/api/games');

// Start the database connection if the env is not test
if (process.env.NODE_ENV !== 'test') {
  connection.dbconnect();
}

// Init Middleware, this allows parsing of incoming payloads that contain JSON
app.use(express.json());

// Sets the url for the routes contained within the second arg
app.use('/api/games', games);

// set listening port from .env or 8082 if not present
const port = process.env.PORT || 8082;
// Listen to the port for requests
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;