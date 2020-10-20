const express = require('express');
const dbSync = require('./config/database');

// env variables
require('dotenv').config();

// create an express app
const app = express();

// connect to the database
dbSync();

// run the app
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log('Server running');
});
