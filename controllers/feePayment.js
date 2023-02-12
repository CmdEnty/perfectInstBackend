const db = require("../connect");
const moment = require("moment");

const getRecordedFeePayment = async (req, res) => {
  const q =
    "SELECT fp.*,so.staffNo AS staffNumber , CONCAT(stf.fastName, ' ' ,stf.middleName, '  ' ,stf.surName) AS staffFullNames, CONCAT(st.fastName, ' ' ,st.middleName, '  ' ,st.surName) AS studentFullNames FROM feepayment AS fp JOIN staff AS stf ON (fp.staffId = stf.id) JOIN staffsotherinfo AS so ON (stf.registrationNumber = so.regNo) JOIN students AS st ON (fp.studentAdm = st.id) ORDER BY fp.dateCreated DESC";
  try {
    await db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const getPayment = async (req, res) => {
  const q =
    "SELECT fp.*,so.staffNo AS staffNumber , CONCAT(stf.fastName, ' ' ,stf.middleName, '  ' ,stf.surName) AS staffFullNames, CONCAT(st.fastName, ' ' ,st.middleName, '  ' ,st.surName) AS studentFullNames FROM feepayment AS fp JOIN staff AS stf ON (fp.staffId = stf.id) JOIN staffsotherinfo AS so ON (stf.registrationNumber = so.regNo) JOIN students AS st ON (fp.studentAdm = st.id) WHERE fp.studentAdm = ? ORDER BY fp.dateCreated DESC";
  try {
    await db.query(q, [req.params.sid], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};
const recordFeePayment = async (req, res) => {
  const q =
    "INSERT INTO feepayment  (`studentAdm`,`accountNo`,`methodOfPayment`,`amount`,`receiptNo`,`paymentStatus`,`staffId`,`dateOfPayment`,`dateCreated`) VALUES (?)";

  const values = [
    req.body.studentAdm,
    req.body.accountNo,
    req.body.methodOfPayment,
    req.body.amount,
    req.body.receiptNo,
    req.body.paymentStatus,
    req.body.staffId,
    moment(req.body.dateOfPayment).format("YYYY-DD-MM HH:mm:ss"),
    moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
  ];

  try {
    await db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send("Fee payment recorded successful");
    });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = { recordFeePayment, getRecordedFeePayment, getPayment };
