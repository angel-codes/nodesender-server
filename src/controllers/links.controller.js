const shortid = require('shortid');
const argon2 = require('argon2');
const { validationResult } = require('express-validator');

// models
const Link = require('../models/link.model');

exports.create = async (req, res) => {
  const { name, original_name } = req.body;

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
    name,
    original_name,
    url: shortid.generate()
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
    // send error
    return res.status(500).json({
      response: 'fail',
      data: 'Something went wrong'
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    // get all links
    const links = await Link.find({}).select('url');

    // return response
    return res.status(200).json({
      response: 'success',
      data: links
    });
  } catch (error) {
    // send error
    return res.status(500).json({
      response: 'fail',
      data: 'Something went wrong'
    });
  }
};

exports.get = async (req, res, next) => {
  // get the url
  const { url } = req.params;

  // check if the link exists
  const link = await Link.findOne({ url });
  if (!link) {
    return res.status(404).json({
      response: 'fail',
      data: 'Link not found'
    });
  }

  // send the file
  res.status(200).json({
    response: 'success',
    data: link.name
  });

  // object destructuring
  const { name, downloads } = link;

  // remove file if the numbers of available downloads is 1
  if (downloads === 1) {
    // set name of the file
    req.file = name;

    // remove link in the database
    await Link.findOneAndRemove({ url });

    // remove file in next middleware
    next();
  } else {
    // decrease the number of available downloads
    link.downloads--;
    await link.save();
  }
};
