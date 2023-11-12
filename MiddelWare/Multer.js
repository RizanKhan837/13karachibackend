const multer  = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads'); // Set the destination folder where uploaded files will be stored
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) + file.originalname;
      cb(null,uniqueSuffix); // Set the filename for the uploaded file
    },
    fileFilter: function (req, file, cb) {
      console.log(file.size); // This will log the file size
      if (file.size > 5000) {
        return cb(new Multer.Error('File size must be less than 3KB'));
      }

      cb(null, file);
    }
  });

  const upload2 = multer({ storage: storage }).array('images');
  // const upload2video = multer({ storage: storage }).single('video');

  module.exports = {upload2}
