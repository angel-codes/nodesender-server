const shortid = require('shortid');
const argon2 = require('argon2');
const { validationResult } = require('express-validator');

// models
const Link = require('../models/link.model');

exports.create = async (req, res) => {
  const { original_name, password } = req.body;

  // errors of express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // send error
    return res.status(400).json({
      response: 'fail',
      errors: errors.array()
    });
  }

  // create new link
  const link = new Link({
    original_name,
    password,
    url: shortid.generate(),
    name: shortid.generate()
  });

  if (req.user) {
    const { password, downloads } = req.body;

    // set downloads limit
    if (downloads) {
      link.downloads = downloads;
    }

    // set the password
    if (password) {
      link.password = await argon2.hash(password);
    }
    // set author
    link.author = req.user.id;
  }

  try {
    // save in database
    await link.save();

    // return response
    return res.status(200).json({
      response: 'success',
      data: link.url
    });
  } catch (error) {
    console.log(error);
    // send error
    return res.status(500).json({
      response: 'fail',
      data: 'Something went wrong'
    });
  }
};
