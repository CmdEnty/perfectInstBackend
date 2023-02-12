const db = require("../connect");
const moment = require("moment");

const getDepartments = async (req, res) => {
  const q = "SELECT * FROM departments";
  try {
    await db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const addDepartment = async (req, res) => {
  const qr = "SELECT * FROM departments WHERE departName = ?";

  const q =
    "INSERT INTO departments (`departName`,`fieldId`,`descr`,`dateCreated`) VALUES (?)";

  const values = [
    req.body.departName,
    req.body.fieldId,
    req.body.descr,
    moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
  ];

  try {
    await db.query(qr, [req.body.departName], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length)
        return res.status(500).json("departName already exists!");
      if (data.length < 1)
        return db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).send("Department Added successful");
        });
    });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  getDepartments,
  addDepartment,
};
