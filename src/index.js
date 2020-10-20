const express = require('express');

// create an express app
const app = express();

// run the app
app.listen(process.env.PORT, '0.0.0.0', () => {
  console.log('Server running');
});
