const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + Path2D.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
