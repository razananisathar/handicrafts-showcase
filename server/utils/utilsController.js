const multer = require('multer');

const utilsController = {};

utilsController.upload = (req, res, next) => {
  console.log('Utils upload', res.locals.product);
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, '/uploads');
    },
    filename: (req, file, cb) => {
      cb(null, res.locals.product._id);
    },
  });

  const upload = multer({ storage }).single('file');
};

module.exports = utilsController;
