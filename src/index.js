const express = require('express');
const morgan = require('morgan');
const dbSync = require('./config/database');

// env variables
require('dotenv').config();

// create an express app
const app = express();

// connect to the database
dbSync();

// middlewares
app.use(morgan('common'));

// body-parser
app.use(express.json());

// routing
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

// run the app
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server running in PORT: ${process.env.PORT}`);
});
