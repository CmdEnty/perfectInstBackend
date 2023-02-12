const db = require("../connect");
// const moment = require("moment");

const getClassSession = async (req, res) => {
  const id = parseInt(req.params.cid);
  const qr = "SELECT * FROM courseclasssession WHERE classId = ? ";

  try {
    await db.query(qr, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const getClassCourses = async (req, res) => {
  const id = parseInt(req.params.cid);
  const qr =
    "SELECT css.*,cs.courseName,cs.courseCode FROM courseclasssession AS css JOIN courses AS cs ON (css.courseId = cs.id) WHERE css.classId = ? ";

  try {
    await db.query(qr, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const getClasses = async (req, res) => {
  // const courseCode = req.body.courseCode;
  const classTitl = `${req.params.classTitle}%`;
  const qr =
    "SELECT ccs.*,intc.classTitle FROM courseclasssession AS ccs JOIN intakeclasses AS intc ON (ccs.classId = intc.id) WHERE ccs.courseId = ? AND ccs.sessionStatus != ? AND intc.classTitle LIKE ? ORDER BY ccs.dateCreated DESC";

  try {
    await db.query(
      qr,
      [parseInt(req.body.courseCode), "closed", classTitl],
      (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(200).send(data);
      }
    );
  } catch (error) {
    return res.send(error);
  }
};

const availableClass = async (req, res) => {
  const id = parseInt(req.params.cid);
  const qr =
    "SELECT ccs.*,intc.classTitle FROM courseclasssession AS ccs JOIN intakeclasses AS intc ON (ccs.classId = intc.id) WHERE ccs.courseId = ? AND ccs.sessionStatus != ? ORDER BY ccs.dateCreated DESC";

  try {
    await db.query(qr, [id, "closed"], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length < 1)
        return res.status(404).send("No class found for this course");
      if (data.length) return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  getClassSession,
  getClasses,
  availableClass,
  getClassCourses,
};
