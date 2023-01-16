const { db } = require("../connect");
const moment = require("moment");

const getSalary = async (req, res) => {
  const q = "SELECT * FROM salary";
  try {
    await db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const salaryView = async (req, res) => {
  const id = parseInt(req.params.id);
  const q = "SELECT * FROM salary WHERE id = ?";

  try {
    await db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const addSalary = async (req, res) => {
  const q =
    "INSERT INTO salary (`staffNo`,`month`,`paymentMode`,`amount`,`receiptNo`,`dateCreated`) VALUES (?)";

  const values = [
    req.body.staffNo,
    req.body.month,
    req.body.methodOfPayment,
    req.body.amount,
    req.body.receiptNo,
    moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
  ];

  try {
    await db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send("Salary Added successful");
    });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  getSalary,
  salaryView,
  addSalary,
};