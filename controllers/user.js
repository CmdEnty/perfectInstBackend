const db = require("../connect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM staffacc WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

const updateUser = (req, res) => {
  let token;
  const userId = req.params.id;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  // check cookies
  else if (req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.SECRETKEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    if (userId === userInfo.id)
      return res.status(500).json("You can update only your post!");

    const q = "UPDATE staffacc SET `userName`=?,`email`=? WHERE id=? ";

    db.query(
      q,
      [req.body.userName, req.body.email, parseInt(req.params.id)],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  });
};

const updateUserPsd = (req, res) => {
  let token;
  const userId = req.params.id;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  // check cookies
  else if (req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.SECRETKEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    if (userId === userInfo.id)
      return res.status(500).json("You can update only your post!");

    const qr = "UPDATE staffacc SET `psd`=? WHERE id=? ";
    const q = "SELECT * FROM staffacc WHERE id = ?";

    db.query(q, [parseInt(req.params.id)], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length === 0) return res.status(404).json("User not found!");
      const { psd, ...others } = data[0];

      const checkPassword = bcrypt.compareSync(req.body.oldPassword, psd);

      if (!checkPassword) return res.status(400).json("Wrong old password!");

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.newPassword, salt);
      // const token = jwt.sign({ id: data[0].id }, process.env.SECRETKEY);

      db.query(qr, [hashedPassword, parseInt(req.params.id)], (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      });
    });
  });
};

const updateProfilePic = (req, res) => {
  let token;
  const userId = req.params.id;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  // check cookies
  else if (req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.SECRETKEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    if (userId === userInfo.id)
      return res.status(500).json("You can update only your post!");

    const q = "UPDATE staffacc SET `profilePic`=? WHERE id=? ";

    db.query(q, [req.body.imgUrl, parseInt(req.params.id)], (err, data) => {
      if (err) res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Updated!");
      return res.status(403).json("You can update only your post!");
    });
  });
};

module.exports = { getUser, updateUser, updateUserPsd, updateProfilePic };
