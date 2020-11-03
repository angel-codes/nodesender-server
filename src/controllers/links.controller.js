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

exports.checkPassword = async (req, res) => {
  // get the url
  const { url } = req.params;

  // password from body
  const { password } = req.body;

  try {
    // check if the link exists
    const link = await Link.findOne({ url });
    if (!link) {
      return res.status(404).json({
        response: 'fail',
        data: 'Link not found'
      });
    }

    // check if the password match
    if (await argon2.verify(link.password, password)) {
      // return response
      return res.status(200).json({
        response: 'success',
        data: 'Unlocked'
      });
    } else {
      return res.status(401).json({
        response: 'fail',
        data: 'Incorrect Password'
      });
    }
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
};

exports.hasPassword = async (req, res, next) => {
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

  // check if the link has password
  if (link.password) {
    return res.status(200).json({
      response: 'success',
      data: {
        file: link.name,
        password: true
      }
    });
  }

  next();
};
