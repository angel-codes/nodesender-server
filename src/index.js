const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dbSync = require('./config/database');

// env variables
require('dotenv').config();

// create an express app
const app = express();

// connect to the database
dbSync();

// middlewares
app.use(cors()); // enable cors
app.use(morgan('common')); // show request in the log
app.use(express.json()); // body-parser

// routing
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));
app.use('/api/files', require('./routes/files'));

// run the app
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log(`Server running in PORT: ${process.env.PORT}`);
});
