const db = require("../connect");
const moment = require("moment");

const getClasses = async (req, res) => {
  const q = "SELECT * FROM intakeclasses";
  try {
    await db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const getClass = async (req, res) => {
  const id = parseInt(req.params.id);
  const q = "SELECT * FROM intakeclasses WHERE id = ?";
  try {
    await db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const addCourse = async (req, res) => {
  const qr =
    "SELECT * FROM courseclasssession WHERE classId = ?  AND courseId = ?";

  const qr1 = "SELECT * FROM courses WHERE id = ? AND feeStructureStatus != ?";

  const q =
    "INSERT INTO courseclasssession (`classId`,`courseId`,`courseSessionId`,`sessionStatus`, `currentSession`,`dateCreated`,`lastModified`) VALUES (?)";

  const q1 =
    "INSERT INTO courseclasssubsession (`mainSessionId`,`feeStructureSessionId`,`sessionStatus`,`fees`, `dateCreated`,`dateModified`) VALUES (?)";

  const q2 =
    "SELECT fss.*, fs.term1 FROM feestructuresession AS fss JOIN feestructure AS fs ON (fs.courseId = ? AND fs.year = ?) WHERE fss.courseId = ?  AND fss.year = ? AND fss.term = ?";
  const values = [
    req.body.classId,
    req.body.courseId,
    req.body.courseSessionId,
    req.body.sessionStatus,
    0,
    moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
    moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
  ];

  try {
    await db.query(
      qr1,
      [parseInt(req.body.courseId), "complited"],
      (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(404).json("Fee Structure Missing!");
        db.query(
          qr,
          [parseInt(req.body.classId), parseInt(req.body.courseId)],
          (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length)
              return res.status(404).json("Course already exists!");
            if (data.length < 1)
              return db.query(q, [values], (err, data) => {
                if (err) return res.status(500).json(err);
                db.query(
                  qr,
                  [parseInt(req.body.classId), parseInt(req.body.courseId)],
                  (err, data) => {
                    if (err) return res.status(500).json(err);
                    const mainSessionId = data[0].id;
                    return db.query(
                      q2,
                      [
                        parseInt(req.body.courseId),
                        1,
                        parseInt(req.body.courseId),
                        1,
                        1,
                      ],
                      (err, data) => {
                        if (err) return res.status(500).json(err);
                        return db.query(
                          q1,
                          [
                            [
                              mainSessionId,
                              data[0].id,
                              "paused",
                              data[0].term1,
                              moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
                              moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
                            ],
                          ],
                          (err, data) => {
                            if (err) return res.status(500).json(err);

                            return res
                              .status(200)
                              .send("Course Added successful");
                          }
                        );
                      }
                      // }
                    );
                  }
                );
              });
          }
        );
      }
    );
  } catch (error) {
    return res.send(error);
  }
};

const addClass = async (req, res) => {
  const qr = "SELECT * FROM intakeclasses WHERE classTitle = ?";

  const q =
    "INSERT INTO intakeclasses (`classTitle`,`descr`,`dateCreated`,`courses`,`reportingDate`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.description,
    moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
    "N/A",
    moment(req.body.reportingDate).format("YYYY-DD-MM"),
  ];

  try {
    await db.query(qr, [req.body.classTitle], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length)
        return res.status(500).json("classTitle already exists!");
      if (data.length < 1)
        return db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).send("Class Added successful");
        });
    });
  } catch (error) {
    return res.send(error);
  }
};
module.exports = {
  getClasses,
  getClass,
  addClass,
  addCourse,
};
