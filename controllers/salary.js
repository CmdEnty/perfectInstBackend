const db = require("../connect");
const moment = require("moment");

const getSalary = async (req, res) => {
  const q =
    "SELECT s.*,so.staffNo AS staffNumber, CONCAT(st.fastName, ' ' ,st.middleName, '  ' ,st.surname) AS fullNames FROM salary AS s JOIN staff AS st ON (s.staffNo = st.id) JOIN staffsotherinfo AS so ON (st.registrationNumber = so.regNo) ORDER BY s.dateCreated DESC";
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
  const q =
    "SELECT s.*, CONCAT(st.fastName, ' ' ,st.middleName, '  ' ,st.surname) AS fullNames FROM salary AS s JOIN staff AS st ON (s.staffNo = st.id)  WHERE s.id = ?";

  try {
    await db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const salaryViewStaff = async (req, res) => {
  const id = req.params.staffNo;
  const q =
    "SELECT s.*, CONCAT(st.fastName, ' ' ,st.middleName, '  ' ,st.surname) AS fullNames FROM salary AS s JOIN staff AS st ON (s.staffNo = st.id)  WHERE s.staffNo = ?";

  try {
    await db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const staffSalaryView = async (req, res) => {
  const id = parseInt(req.params.sid);
  const q =
    "SELECT s.*, CONCAT(st.fastName, ' ' ,st.middleName, '  ' ,st.surname) AS fullNames, st.staffTitle, st.idNumber, st.id AS staffID, st.snationality, sc.county, sc.phoneNumber, sc.email, so.staffNo AS staffNumber, so.designation FROM salary AS s JOIN staff AS st ON (s.staffNo = st.id) JOIN staffscontacts AS sc ON (sc.regNo = st.registrationNumber) JOIN staffsotherinfo AS so ON (st.registrationNumber = so.regNo)  WHERE s.id = ?";

  try {
    await db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data[0]);
    });
  } catch (error) {
    return res.send(error);
  }
};

const addSalary = async (req, res) => {
  const q =
    "INSERT INTO salary (`staffNo`,`month`,`paymentMode`,`amount`,`receiptNo`,`dateCreated`) VALUES (?)";

  const values = [
    req.body.id,
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
  staffSalaryView,
  salaryViewStaff,
};
