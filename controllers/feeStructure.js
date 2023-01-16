const { db } = require("../connect");
const moment = require("moment");

const getFeeStructure = async (req, res) => {
  const q = "SELECT * FROM feestructure";
  try {
    await db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const addFeeStructure = async (req, res) => {
  const qr = "SELECT * FROM feestructure WHERE courseId = ?";

  const q =
    "INSERT INTO feestructure (`courseId`,`structureTbl`,`dateCreated`,`dateModified`) VALUES (?)";

  const values = [
    req.body.courseId,
    req.body.structureTbl,
    moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
    moment(req.body.dateModified).format("YYYY-DD-MM HH:mm:ss"),
  ];

  try {
    await db.query(qr, [req.body.courseId], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length)
        return res
          .status(500)
          .json("FeeStructure for this course already exists!");
      if (data.length < 1)
        return db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).send("FeeStructure submited successful");
        });
    });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  getFeeStructure,
  addFeeStructure,
};