const db = require("../connect");
const moment = require("moment");

const getFields = async (req, res) => {
  const q = "SELECT * FROM tblfields";
  try {
    await db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const fieldSearch = async (req, res) => {
  const fieldName = `${req.params.fieldName}%`;
  const q = "SELECT * FROM tblfields WHERE fieldName LIKE ?";

  try {
    await db.query(q, [fieldName], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const addfield = async (req, res) => {
  const qr = "SELECT * FROM tblfields WHERE fieldName = ?";

  const q =
    "INSERT INTO tblfields (`fieldName`,`descr`,`courseId`,`dateCreated`) VALUES (?)";

  const values = [
    req.body.fieldName,
    req.body.descr,
    "N/A",
    moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
  ];

  try {
    await db.query(qr, [req.body.fieldName], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(500).json("fieldName already exists!");
      if (data.length < 1)
        return db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).send("Field Added successful");
        });
    });
  } catch (error) {
    return res.send(error);
  }
};

const updateField = async (req, res) => {
  const qr = "SELECT * FROM tblfields WHERE id = ?";

  const q = "UPDATE tblfields SET fieldName = ?,descr = ? WHERE id = ?";

  try {
    await db.query(qr, [parseInt(req.params.id)], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length < 1) return res.status(500).json("field not exist!");
      if (data.length)
        return db.query(
          q,
          [req.body.fieldName, req.body.descr, parseInt(req.params.id)],
          (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).send("Field Updated successful");
          }
        );
    });
  } catch (error) {
    return res.send(error);
  }
};

const deleteField = async (req, res) => {
  const qr = "SELECT * FROM tblfields WHERE id = ?";

  const q = "DELETE FROM tblfields WHERE id = ?";

  try {
    await db.query(qr, [parseInt(req.params.id)], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length < 1) return res.status(500).json("field not exist!");
      if (data.length)
        return db.query(q, [parseInt(req.params.id)], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).send("Field Deleted successful");
        });
    });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  getFields,
  addfield,
  fieldSearch,
  updateField,
  deleteField,
};
