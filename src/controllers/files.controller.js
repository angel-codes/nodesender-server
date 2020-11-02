const multer = require('multer');
const fs = require('fs');

// models
const Link = require('../models/link.model');
// configs
const multerConfig = require('../config/multer.config');

exports.upload = async (req, res) => {
  // upload files
  const upload = multer({
    ...multerConfig,
    limits: { fileSize: req.user ? 1024 * 1024 * 10 : 1024 * 1024 }
  }).single('file');

  upload(req, res, async error => {
    if (!error) {
      res.status(200).json({
        response: 'success',
        data: req.file.filename
      });
    } else {
      return res.status(500).json({
        response: 'fail',
        data: error
      });
    }
  });
};

exports.download = async (req, res, next) => {
  const file = __dirname + '/../../uploads/' + req.params.file;
  res.download(file);

  const link = await Link.findOne({ name: req.params.file });
  // object destructuring
  const { name, downloads } = link;

  // remove file if the numbers of available downloads is 1
  if (downloads === 1) {
    // set name of the file
    req.file = name;

    // remove link in the database
    await Link.findOneAndRemove({ name: req.params.file });

    // remove file in next middleware
    next();
  } else {
    // decrease the number of available downloads
    link.downloads--;
    await link.save();
  }
};

exports.remove = async (req, res) => {
  try {
    fs.unlinkSync(__dirname + `/../../uploads/${req.file}`);
    res.status(200).json({
      response: 'success',
      data: 'File removed'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      response: 'fail',
      data: error
    });
  }
};
