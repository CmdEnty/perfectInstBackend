const db = require("../connect");
const moment = require("moment");

const getClasses = async (req, res) => {
  const q = "SELECT * FROM intakeclasses";
  try {
    await db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const addClass = async (req, res) => {
  const qr = "SELECT * FROM intakeclasses WHERE classTitle = ?";

  const q =
    "INSERT INTO intakeclasses (`classTitle`,`descr`,`dateCreated`,`courses`,`reportingDate`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.description,
    moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
    "N/A",
    moment(req.body.reportingDate).format("YYYY-DD-MM"),
  ];

  try {
    await db.query(qr, [req.body.classTitle], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length)
        return res.status(500).json("classTitle already exists!");
      if (data.length < 1)
        return db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).send("Class Added successful");
        });
    });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  getClasses,
  addClass,
};