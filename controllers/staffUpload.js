const multer = require("multer");

// const multerStorage = (dir) => {
const storage = (dir) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dir);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
};
//   return storage;
// };

const uploadKraPin = (req, res) => {
  kraStorage = storage("../../pitps/public/uploads/staff/kraPin");
  const upload = multer({ storage: kraStorage });
  upload.single("file");
  const file = req.file;
  res.status(200).json(file.filename);
};

const uploadNhif = (req, res) => {
  nhifStorage = storage("../../pitps/public/uploads/staff/nhif");
  const upload = multer({ storage: nhifStorage });
  upload.single("file");
  const file = req.file;
  res.status(200).json(file.filename);
};

module.exports = {
  uploadKraPin,
  uploadNhif,
};
