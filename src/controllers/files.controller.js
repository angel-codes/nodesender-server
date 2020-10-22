const multer = require('multer');
const fs = require('fs');

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
exports.remove = async (req, res) => {
  console.log(req.file);

  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.file}`);
    console.log('eliminado');
  } catch (error) {
    console.log(error);
  }
};
