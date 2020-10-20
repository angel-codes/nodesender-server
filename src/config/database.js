const mongoose = require('mongoose');

const dbSync = async () => {
  try {
    // connect to the mongo database
    await mongoose.connect(process.env.DB_MONGO || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Database syncing');
  } catch (error) {
    // show error and stop the server
    console.error(error);
    process.exit(1);
  }
};

module.exports = dbSync;
