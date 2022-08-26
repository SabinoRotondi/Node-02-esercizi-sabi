const multer = require('multer');
const { randomUUID } = require('node:crypto');
const mime = require('mime');
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, res, callback) => {
    return callback(null, generatePhotoFilename(file.mimetype));
  },
});
const MAX_SIZE_IN_MEGABYTES = 6 * 1024 * 1024;
const VALID_MIME_TYPE = ['image/png', 'image/jpeg'];
const fileFilter = (req, file, callback) => {
  if (VALID_MIME_TYPE.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(
      new Error('Error: The uploaded file must be a JPG or a PNG image')
    );
  }
};
const multerOptions = {
  fileFilter,
  limits: {
    fileSize: MAX_SIZE_IN_MEGABYTES,
  },
};
const initMulterMiddleware = () => {
  return multer({ storage, ...multerOptions });
};
const generatePhotoFilename = (mimeType) => {
  const randomFilename = `${randomUUID()}-${Date.now()}`;
  const fileExtension = mime.getExtension(mimeType);
  const filename = `${randomFilename}.${fileExtension}`;
  return filename;
};
module.exports = { multerOptions, initMulterMiddleware };