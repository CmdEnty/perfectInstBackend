import moment from "moment";
import { db } from "../connect.js";

export const getUnits = async (req, res) => {
  const q = "SELECT * FROM tblunits";
  try {
    await db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

export const addUnit = async (req, res) => {
  const qr = "SELECT * FROM tblunits WHERE unitCode = ?";
  const qry = "SELECT * FROM tblunits WHERE unitName = ?";

  const q =
    "INSERT INTO tblunits (`unitName`,`unitCode`,`descr`,`departId`,`dateCreated`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.code,
    req.body.description,
    req.body.department,
    moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
  ];

  try {
    await db.query(qr, [req.body.code], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(500).json("Unit Code already exists!");
      if (data.length < 1)
        return db.query(qry, [req.body.title], (err, data) => {
          if (err) return res.status(500).json(err);
          if (data.length)
            return res.status(500).json("Unit Title already exists!");
          if (data.length < 1)
            return db.query(q, [values], (err, data) => {
              if (err) return res.status(500).json(err);
              return res.status(200).send("Unit added successful");
            });
        });
    });
  } catch (error) {
    return res.send(error);
  }
};
