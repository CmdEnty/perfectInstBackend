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
const updateDepartment = async (req, res) => {
  const qr = "SELECT * FROM departments WHERE id = ?";

  const q =
    "UPDATE departments SET departName = ?, fieldId = ?,descr = ? WHERE id = ?";

  try {
    await db.query(qr, [parseInt(req.params.id)], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length < 1) return res.status(500).json("Department not exist!");
      if (data.length)
        return db.query(
          q,
          [
            req.body.departName,
            req.body.fieldId,
            req.body.descr,
            parseInt(req.params.id),
          ],
          (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).send("Department Updated successful");
          }
        );
    });
  } catch (error) {
    return res.send(error);
  }
};

const deleteDepartment = async (req, res) => {
  const qr = "SELECT * FROM departments WHERE id = ?";

  const q = "DELETE FROM departments WHERE id = ?";

  try {
    await db.query(qr, [parseInt(req.params.id)], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length < 1) return res.status(500).json("Department not exist!");
      if (data.length)
        return db.query(q, [parseInt(req.params.id)], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).send("Department Deleted successful");
        });
    });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  getDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
