// models
const User = require('../models/user.model');

// create a user
exports.create = async (req, res) => {
  const { email } = req.body;

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
  const user = await new User(req.body);
  await user.save();

  // send success response
  res.status(200).json({
    response: 'success',
    data: 'User created successfully'
  });
};
