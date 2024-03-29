const db = require("../connect");
const moment = require("moment");

const getCourse = async (req, res) => {
  const q = "SELECT * FROM courses";
  try {
    await db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const getComplited = async (req, res) => {
  const q = "SELECT * FROM courses WHERE feeStructureStatus = ?";
  try {
    await db.query(q, ["complited"], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const searchCourse = async (req, res) => {
  const cid = `${req.params.cid}%`;
  const q = "SELECT * FROM courses WHERE courseCode LIKE ?";

  try {
    await db.query(q, [cid], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const courseView = async (req, res) => {
  const cid = parseInt(req.params.cid);
  const q = "SELECT * FROM courses WHERE id = ?";

  try {
    await db.query(q, [cid], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data[0]);
    });
  } catch (error) {
    return res.send(error);
  }
};

const deleteCourse = async (req, res) => {
  const id = parseInt(req.params.id);
  const q = "DELETE FROM courses WHERE id = ?";

  try {
    await db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
    });
  } catch (error) {
    return res.send(error);
  }
};

const addCourse = async (req, res) => {
  const qr = "SELECT * FROM courses WHERE courseCode = ?";
  const qry = "SELECT * FROM courses WHERE courseName = ?";
  const q =
    "INSERT INTO courses (`courseCode`,`courseField`,	`courseLevel`,	`courseName`,`dateCreated`,	`duration`,	`period`,`feeStructureStatus`,`qualification`) VALUES (?)";

  const values = [
    req.body.code,
    req.body.field,
    req.body.level,
    req.body.title,
    moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
    req.body.duration,
    req.body.durationValue,
    "incomplite",
    req.body.qualification,
  ];

  try {
    await db.query(qr, [req.body.code], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length)
        return res.status(500).json("Course Code already exists!");
      if (data.length < 1)
        return db.query(qry, [req.body.title], (err, data) => {
          if (err) return res.status(500).json(err);
          if (data.length)
            return res.status(500).json("Course Title already exists!");
          if (data.length < 1)
            return db.query(q, [values], (err, data) => {
              if (err) return res.status(500).json(err);
              return res.status(200).send("course added successful");
            });
        });
    });
  } catch (error) {
    return res.send(error);
  }
};
module.exports = {
  addCourse,
  deleteCourse,
  courseView,
  searchCourse,
  getCourse,
  getComplited,
};
