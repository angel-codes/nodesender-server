const argon2 = require('argon2');
const { validationResult } = require('express-validator');

// models
const User = require('../models/user.model');

// create a user
exports.create = async (req, res) => {
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

  // check if the user is already registered
  const userExists = await User.findOne({ email });
  if (userExists) {
    // send error
    return res.status(400).json({
      response: 'fail',
      data: 'User already registered'
    });
  }

  // create new user
  const user = new User({
    ...req.body,
    // hash the password of the user
    password: await argon2.hash(password)
  });
  await user.save();

  // send success response
  res.status(200).json({
    response: 'success',
    data: 'User created successfully'
  });
};
