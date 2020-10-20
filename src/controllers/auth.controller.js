const argon2 = require('argon2');
const { validationResult } = require('express-validator');
const jtw = require('jsonwebtoken');

// models
const User = require('../models/user.model');

exports.authenticate = async (req, res) => {
  const { email, password } = req.body;

  // errors of express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // send error
    return res.status(400).json({
      response: 'fail',
      errors: errors.array()
    });
  }

  // search the user
  const user = await User.findOne({ email });
  if (!user) {
    // send error
    return res.status(401).json({
      response: 'fail',
      data: 'User not found'
    });
  }

  // check if the password match
  if (await argon2.verify(user.password, password)) {
    // create a jsonwebtoken
    const token = jtw.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email
      },
      process.env.SECRET,
      {
        expiresIn: '8h'
      }
    );
    // return the token
    res.status(200).json({
      response: 'success',
      data: token
    });
  } else {
    // send error
    return res.status(401).json({
      response: 'fail',
      data: 'Incorrect password'
    });
  }
};

exports.userAuthenticated = async (req, res) => {
  const { user } = req;
  res.status(200).json({
    response: 'success',
    data: user
  });
};
