const multer = require('multer');
const path = require('path');

const utilsController = {};

utilsController.upload = (req, res, next) => {
  // storage settings.
  const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../uploads'),
    filename: (req, file, cb) => {
      const fileName = `pro-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, fileName);
    },
  });

  // upload req param: photo
  const upload = multer({ storage }).single('photo');

  // upload to storage.
  upload(req, res, (e) => {
    if (e instanceof multer.MulterError) {
      return next({
        log: `utilsController.upload: ${e}`,
        status: 500,
        message: {
          err: `Errror in plugin: ${e}`,
        },
      });
    }

    if (e) {
      return next({
        log: `utilsController.upload: ${e}`,
        status: 500,
        message: {
          err: 'Image upload error.',
        },
      });
    }

    res.locals.image = {
      photo: `${req.file.filename}`,
    };

    next();
  });
};

module.exports = utilsController;
