const db = require("../connect");
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

const getFeeStructureSession = async (req, res) => {
  const id = parseInt(req.params.cid);
  const q = "SELECT * FROM feestructuresession WHERE courseId = ? AND year = ?";
  try {
    await db.query(q, [id, parseInt(req.body.year)], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length < 1) return res.status(201).send("empty");
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const addFeeStructure = async (req, res) => {
  const qr = "SELECT * FROM feestructure WHERE courseId = ? AND year = ?";

  const q =
    "INSERT INTO feestructure (`courseId`,`year`,`noOfTerms`,`term1`,`term2`,`term3`,`total`,`dateCreated`,`dateModified`) VALUES (?)";

  const qr1 =
    "INSERT INTO feestructuresession (`courseId`,	`year`,	`term`, `fees`,	`sessionStatus`	) VALUES (?)";

  const qr2 =
    "INSERT INTO feestructuresession (`courseId`,	`year`,	`term`, `fees`,	`sessionStatus`	) VALUES (?),(?)";

  const qr3 =
    "INSERT INTO feestructuresession (`courseId`,	`year`,	`term`, `fees`,	`sessionStatus`	) VALUES (?),(?),(?)";

  const values = [
    req.body.courseId,
    parseInt(req.body.year),
    parseInt(req.body.noOfTerms),
    parseInt(req.body.term1),
    parseInt(req.body.term2),
    parseInt(req.body.term3),
    parseInt(req.body.total),
    moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
    // moment(req.body.dateModified).format("YYYY-DD-MM HH:mm:ss"),
    "n/a",
  ];

  const values1 = [
    req.body.courseId,
    parseInt(req.body.year),
    1,
    parseInt(req.body.term1),
    Number(req.body.noOfTerms) === 1 ? "endTerm" : "next",
  ];

  const values2 = [
    req.body.courseId,
    parseInt(req.body.year),
    2,
    parseInt(req.body.term2),
    Number(req.body.noOfTerms) === 2 ? "endTerm" : "next",
  ];

  const values3 = [
    req.body.courseId,
    parseInt(req.body.year),
    ,
    3,
    parseInt(req.body.term3),
    "endTerm",
  ];

  try {
    await db.query(
      qr,
      [req.body.courseId, parseInt(req.body.year)],
      (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length)
          return res
            .status(500)
            .json(
              "FeeStructure for year " + req.body.year + " already exists!"
            );
        if (data.length < 1)
          return db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            if (Number(req.body.noOfTerms) === 1) {
              return db.query(qr1, [values1], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).send("FeeStructure submited successful");
              });
            } else if (Number(req.body.noOfTerms) === 2) {
              return db.query(qr2, [values1, values2], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).send("FeeStructure submited successful");
              });
            } else if (Number(req.body.noOfTerms) === 3) {
              return db.query(qr3, [values1, values2, values3], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).send("FeeStructure submited successful");
              });
            }
          });
      }
    );
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  getFeeStructure,
  addFeeStructure,
  getFeeStructureSession,
};
