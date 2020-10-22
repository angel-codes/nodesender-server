const multer = require('multer');
const shortid = require('shortid');

module.exports = {
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + '/../uploads');
    },
    filename: (req, file, cb) => {
      const fileExtension = file.originalname.substring(
        file.originalname.lastIndexOf('.'),
        file.originalname.length
      );
      cb(null, `${shortid.generate()}${fileExtension}`);
    }
  }))
};
