const db  = require("../connect");
const moment = require("moment");

const getExpenditures = async (req, res) => {
  const q = "SELECT * FROM otherexpenditures";
  try {
    await db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const expenditureView = async (req, res) => {
  const id = parseInt(req.params.id);
  const q = "SELECT * FROM otherexpenditures WHERE id = ?";

  try {
    await db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const addExpenditure = async (req, res) => {
  const q =
    "INSERT INTO otherexpenditures (`amount`,`spentFor`,`methodOfPayment`,`receiptNo`,`recipientPhone`,`description`,`dateSpent`,`dateCreated`) VALUES (?)";

  const values = [
    req.body.amount,
    req.body.spentFor,
    req.body.methodOfPayment,
    req.body.receiptNo,
    req.body.recipientPhone,
    req.body.description,
    moment(req.body.dateSpent).format("YYYY-DD-MM HH:mm:ss"),
    moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
  ];

  try {
    await db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send("Added successful");
    });
  } catch (error) {
    return res.send(error);
  }
};
module.exports = {
  getExpenditures,
  expenditureView,
  addExpenditure,
};