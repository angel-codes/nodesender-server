const multer = require('multer');

// configs
const multerConfig = require('../config/multer.config');
// upload files
const upload = multer(multerConfig).single('file');

exports.upload = async (req, res) => {
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
  console.log('remove a file...');
};
