const db = require("../connect");
const moment = require("moment");

const getDesign = async (req, res) => {
  const q = "SELECT * FROM staffdesgn";
  try {
    await db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const editSalary = async (req, res) => {
  const id = req.body.id;
  const q = "UPDATE staffdesgn SET salary = ? WHERE id = ?";

  try {
    await db.query(q, [req.body.salary, id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send("Updated Successful");
    });
  } catch (error) {
    return res.send(error);
  }
};

const designView = async (req, res) => {
  const id = parseInt(req.params.id);
  const q = "SELECT * FROM staffdesgn WHERE id = ?";

  try {
    await db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const designationSearch = async (req, res) => {
  const designationTitle = `${req.params.designationTitle}%`;
  const q = "SELECT * FROM staffdesgn WHERE nameTitle LIKE ?";

  try {
    await db.query(q, [designationTitle], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const addDesign = async (req, res) => {
  const qr = "SELECT * FROM staffdesgn WHERE nameTitle = ?";

  const q =
    "INSERT INTO staffdesgn (`nameTitle`,`salary`,	`responsibilities`,	`qualifications`,`dateCreated`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.salary,
    "N/A",
    "N/A",
    moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
  ];

  try {
    await db.query(qr, [req.body.title], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(500).json("Title already exists!");
      if (data.length < 1)
        return db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).send("Added successful");
        });
    });
  } catch (error) {
    return res.send(error);
  }
};
module.exports = {
  getDesign,
  designView,
  designationSearch,
  addDesign,
  editSalary,
};
