const db = require("../connect");
const moment = require("moment");

const getResources = async (req, res) => {
  const q = "SELECT * FROM resourceuploads ORDER BY dateCreated DESC";
  try {
    await db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data);
    });
  } catch (error) {
    return res.send(error);
  }
};

const downloadResource = async (req, res) => {
  const id = parseInt(req.params.resourceId);
  const q = "SELECT * FROM resourceuploads WHERE id = ?";
  
  try {
     await db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send(data[0]);
    });
  } catch (error) {
    return res.send(error);
  }
};

const deleteResource = async (req, res) => {
  const id = parseInt(req.params.resourceId);
  const q = "DELETE FROM resourceuploads WHERE id = ?";
  try {
    await db.query(q, [id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send("Resource deleted successful");
    });
  } catch (error) {
    return res.send(error);
  }
};

const uploadResource = async (req, res) => {
  const qr =
    "INSERT INTO resourceuploads (docTitle,docUrl,dateCreated,dateModified) VALUES (?)";

  const values = [
    req.body.title,
    req.body.docUrl,
    moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
    moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
  ];

  try {
    await db.query(qr, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).send("Resource uploaded successful");
    });
  } catch (error) {
    return res.send(error);
  }
};
module.exports = {
  getResources,
  uploadResource,
  deleteResource,
  downloadResource,
};
