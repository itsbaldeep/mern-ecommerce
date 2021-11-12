const multer = require("multer");
const ErrorResponse = require("../utils/errorResponse");

// Configuring disk storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./client/public/uploads"),
  filename: (req, file, cb) => {
    // Renaming the file to avoid name collision
    const timestamp = new Date().getTime().toString();
    const filename = timestamp.concat(file.originalname);
    cb(null, filename);
  },
});

// Configuring the upload middleware function
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Allowing only image file types
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new ErrorResponse("Only png and jpg/jpeg image formats are allowed", 400));
    }
  },
  // Maximum allowed file size is 5 MB
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
