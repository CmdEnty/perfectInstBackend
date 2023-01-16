const { db } = require("../connect");
const moment = require("moment");

const getStaffs = async (req, res) => {
  const q =
    "SELECT s.*,so.staffStatus,so.regDate,so.staffNo,so.fieldId,so.designation, sc.county, sc.phoneNumber FROM staff AS s JOIN staffsotherinfo AS so ON (s.registrationNumber = so.regNo) JOIN staffscontacts AS sc ON (s.registrationNumber = sc.regNo)";
  try {
    await db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const staffSearch = async (req, res) => {
  const idNumber = `${req.params.idNumber}%`;
  const q = "SELECT * FROM staff WHERE idNumber LIKE ?";

  try {
    await db.query(q, [idNumber], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const staffView = async (req, res) => {
  const sid = parseInt(req.params.sid);
  const q =
    "SELECT s.*,sc.*,sg.*,so.* FROM staff AS s JOIN staffscontacts AS sc ON (s.registrationNumber = sc.regNo) JOIN stafsguaranters AS sg ON (s.registrationNumber = sg.regNo) JOIN staffsotherinfo AS so ON (s.registrationNumber = so.regNo) WHERE s.id = ?";
  try {
    await db.query(q, [sid], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data[0]);
    });
  } catch (error) {
    return res.send(error);
  }
};

const deleteStaff = async (req, res) => {
  const regNo = parseInt(req.params.regNo);
  const q = "DELETE FROM staff WHERE registrationNumber = ?";

  const qr = "DELETE FROM staffscontacts WHERE regNo = ?";

  const qry = "DELETE FROM stafsguaranters WHERE regNo = ?";

  const qrry = "DELETE FROM staffsotherinfo WHERE regNo = ?";
  try {
    await db.query(q, [regNo], (err, data) => {
      if (err) return res.status(500).json(err);
    });
    await db.query(qr, [regNo], (err, data) => {
      if (err) return res.status(500).json(err);
    });
    await db.query(qry, [regNo], (err, data) => {
      if (err) return res.status(500).json(err);
    });
    await db.query(qrry, [regNo], (err, data) => {
      if (err) return res.status(500).json(err);
    });
  } catch (error) {
    return res.send(error);
  }
};

const addStaff = async (req, res) => {
  const qer = "SELECT * FROM staff WHERE idNumber = ?";
  const q =
    "INSERT INTO staff (`staffTitle`,	`surName`,	`fastName`,	`middleName`,	`sgender`,	`idNumber`,	`snationality`,	`dob`,	`registrationNumber`) VALUES (?)";

  const values = [
    req.body.selectedValue,
    req.body.surName,
    req.body.fastName,
    req.body.middleName,
    req.body.selectedGender,
    req.body.idNumber,
    req.body.snationality,
    moment(req.body.DOB).format("YYYY-DD-MM"),
    req.body.regNo,
  ];

  const qr =
    "INSERT INTO staffscontacts (`placeOfBirth`,	`county`,	`location`,	`phoneNumber`,	`email`,`regNo`) VALUES (?)";

  const values1 = [
    req.body.placeOfBirth,
    req.body.county,
    req.body.location,
    req.body.phone,
    req.body.email,
    req.body.regNo,
  ];

  const qry =
    "INSERT INTO stafsguaranters (`staffNo`,`fullNames`,`nationality`,	`idNo`,	`relation`,`emailAddress`,	`phoneNo`,	`glocation`,`gender`,`regNo`) VALUES (?)";

  const values2 = [
    "N/A",
    req.body.fullName,
    req.body.g_nationality,
    req.body.g_idNo,
    req.body.relationShip,
    req.body.g_email,
    req.body.g_phone,
    req.body.g_location,
    req.body.g_gender,
    req.body.regNo,
  ];

  const qrry =
    "INSERT INTO staffsotherinfo (`fieldId`,`staffNo`,`designation`,`specialNeeds`,`staffStatus`,`regNo`,`regMode`,	`regDate`,`maritalStatus`) VALUES (?)";

  const values3 = [
    req.body.field,
    "N/A",
    req.body.designation,
    req.body.specialNeeds,
    "Registered",
    req.body.regNo,
    "Local",
    moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
    req.body.maritalStatus,
  ];
  try {
    await db.query(qer, [req.body.idNumber], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length)
        return res.status(500).json("Staff Id number already exists!");
      if (data.length < 1) {
        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          db.query(qr, [values1], (err, data) => {
            if (err) return res.status(500).json(err);
            db.query(qry, [values2], (err, data) => {
              if (err) return res.status(500).json(err);
              db.query(qrry, [values3], (err, data) => {
                if (err) return res.status(500).json(err);
                return res.status(200).send("Staff Added Successful");
              });
            });
          });
        });
      }
    });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  getStaffs,
  staffView,
  addStaff,
  deleteStaff,
  staffSearch,
};
