const db = require("../connect");
const moment = require("moment");

const getAdmittedStudents = (req, res) => {
  const q =
    "SELECT s.*,so.studentStatus FROM students AS s JOIN studentsotherinfo AS so ON (s.registrationNumber = so.regNo AND so.studentStatus = 'admitted')";
  db.query(q, function (err, data) {
    if (err) return res.status(500).json(err);
    return res.status(200).send(data);
  });
};

const getPendingStudentsLocal = async (req, res) => {
  const q =
    "SELECT s.*,so.studentStatus FROM students AS s JOIN studentsotherinfo AS so ON (s.registrationNumber = so.regNo AND so.studentStatus != 'admitted' AND so.regMode = 'Local')";
  try {
    await db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const studentSearch = async (req, res) => {
  const idNumber = `${req.params.idNumber}%`;
  const q =
    "SELECT s.*, so.courseId, co.courseName FROM students AS s JOIN studentsotherinfo AS so ON (s.registrationNumber = so.regNo) JOIN courses AS co ON (so.courseId = co.courseCode)  WHERE s.idNumber LIKE ?";

  try {
    await db.query(q, [idNumber], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const studentView = async (req, res) => {
  const sid = parseInt(req.params.sid);
  const q =
    "SELECT s.*,sc.*,sn.*,so.*,co.* FROM students AS s JOIN studentscontacts AS sc ON (s.registrationNumber = sc.regNo) JOIN studentsnextofkin AS sn ON (s.registrationNumber = sn.regNo) JOIN studentsotherinfo AS so ON (s.registrationNumber = so.regNo) JOIN courses AS co ON (co.courseCode = so.courseId) WHERE s.id = ?";
  try {
    await db.query(q, [sid], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data[0]);
    });
  } catch (error) {
    return res.send(error);
  }
};

const studentUpdate = async (req, res) => {
  const sid = parseInt(req.params.sid);
  const q = `UPDATE students SET '${valueName}' = '${value}' WHERE id = ?`;
  try {
    await db.query(q, [sid], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send("Student Updated Successful");
    });
  } catch (error) {
    return res.send(error);
  }
};

const updateStudent = async (req, res) => {
  const sid = parseInt(req.params.sid);
  const q =
    "UPDATE students SET surName = ?, fastName = ?, middleName = ?, idNumber = ? WHERE id = ?";
  try {
    await db.query(
      q,
      [
        req.body.surName,
        req.body.fastName,
        req.body.middleName,
        req.body.idNumber,
        sid,
      ],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.send("Student Updated Successful");
      }
    );
  } catch (error) {
    return res.send(error);
  }
};

const updateSpecialNeeds = async (req, res) => {
  const q = "UPDATE studentsotherinfo SET specialNeeds = ? WHERE regNo = ?";
  try {
    await db.query(q, [req.body.specialNeeds, req.body.regNo], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.send("Student Updated Successful");
    });
  } catch (error) {
    return res.send(error);
  }
};

const updateContacts = async (req, res) => {
  const sid = parseInt(req.params.sid);
  const q =
    "UPDATE studentscontacts SET phoneNumber = ?, email = ? WHERE id = ?";
  try {
    await db.query(
      q,
      [req.body.phoneNumber, req.body.email, sid],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.send("Student Updated Successful");
      }
    );
  } catch (error) {
    return res.send(error);
  }
};

const admitStudent = async (req, res) => {
  const regNo = parseInt(req.params.regNo);
  const q =
    "UPDATE studentsotherinfo SET admDate = CURRENT_TIMESTAMP, studentStatus = 'admitted' WHERE regNo = ?";
  try {
    await db.query(q, [regNo], (err, data) => {
      if (err) return res.status(500).json(err);
    });
  } catch (error) {
    return res.send(error);
  }
};
const deleteStudent = async (req, res) => {
  const regNo = parseInt(req.params.regNo);
  const q = "DELETE FROM students WHERE registrationNumber = ?";

  const qr = "DELETE FROM studentscontacts WHERE regNo = ?";

  const qry = "DELETE FROM studentsnextofkin WHERE regNo = ?";

  const qrry = "DELETE FROM studentsotherinfo WHERE regNo = ?";
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

const addStudent = async (req, res) => {
  const q =
    "INSERT INTO students (`studentTitle`,	`surName`,	`fastName`,	`middleName`,	`sgender`,	`idNumber`,	`snationality`,	`dob`,	`registrationNumber`) VALUES (?)";

  const values = [
    req.body.selectedValue,
    req.body.surName,
    req.body.fastName,
    req.body.middleName,
    req.body.gender,
    req.body.idNumber,
    req.body.nationality,
    moment(req.body.DOB.$d).format("YYYY-DD-MM"),
    req.body.regNo,
  ];

  const qr =
    "INSERT INTO studentscontacts (`placeOfBirth`,	`county`,	`location`,	`phoneNumber`,	`email`,`regNo`) VALUES (?)";

  const values1 = [
    req.body.placeOfBirth,
    req.body.county,
    req.body.location,
    req.body.phone,
    req.body.email,
    req.body.regNo,
  ];

  const qry =
    "INSERT INTO studentsnextofkin (`studentAdm`,`fullNames`,`nationality`,	`idNo`,	`relation`,`emailAddress`,	`phoneNo`,	`plocation`,`gender`,`regNo`) VALUES (?)";

  const values2 = [
    "N/A",
    req.body.fullName,
    req.body.p_nationality,
    req.body.p_idNo,
    req.body.relationShip,
    req.body.p_email,
    req.body.p_phone,
    req.body.p_location,
    req.body.p_gender,
    req.body.regNo,
  ];

  const qrry =
    "INSERT INTO studentsotherinfo (`courseId`,`admissionNo`,`studentClass`,`specialNeeds`,`studentStatus`,`regNo`,`regMode`,	`regDate`,`admDate`,`maritalStatus`) VALUES (?)";

  const values3 = [
    req.body.course,
    "N/A",
    "N/A",
    req.body.specialNeeds,
    "Awaiting admission",
    req.body.regNo,
    "Local",
    moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
    "N/A",
    req.body.maritalStatus,
  ];
  try {
    await db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
    });
    await db.query(qr, [values1], (err, data) => {
      if (err) return res.status(500).json(err);
    });
    await db.query(qry, [values2], (err, data) => {
      if (err) return res.status(500).json(err);
    });
    await db.query(qrry, [values3], (err, data) => {
      if (err) return res.status(500).json(err);
    });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  getAdmittedStudents,
  studentView,
  getPendingStudentsLocal,
  addStudent,
  admitStudent,
  deleteStudent,
  studentUpdate,
  updateStudent,
  updateContacts,
  updateSpecialNeeds,
  studentSearch,
};
