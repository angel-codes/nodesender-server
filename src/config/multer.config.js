const multer = require('multer');
const shortid = require('shortid');

module.exports = {
  limits: { fileSize: 1000000 },
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + './../uploads');
    },
    filename: (req, file, cb) => {
      const fileExtension = file.mimetype.split('/')[1];
      cb(null, `${shortid.generate()}.${fileExtension}`);
    }
  }))
};
