const express = require('express');

// env variables
require('dotenv').config();

// create an express app
const app = express();

// run the app
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log('Server running');
});
