const argon2 = require('argon2');

// models
const User = require('../models/user.model');

exports.authenticate = async (req, res) => {
  const { email, password } = req.body;

  // search the user
  const userTryingAuth = await User.findOne({ email });
  if (!userTryingAuth) {
    // send error
    return res.status(401).json({
      response: 'fail',
      data: 'User not found'
    });
  }

  // check if the password match
  if (await argon2.verify(userTryingAuth.password, password)) {
    console.log('same password');
  } else {
    // send error
    return res.status(401).json({
      response: 'fail',
      data: 'Incorrect password'
    });
  }
};

exports.userAuthenticated = async (req, res) => {};
