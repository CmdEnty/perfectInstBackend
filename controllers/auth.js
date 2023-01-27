const db = require("../connect");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
// const { attachCookiesToResponse, createTokenUser } = require("../utils");

require("dotenv").config();

const register = (req, res) => {
  //CHECK USER IF EXISTS

  const q = "SELECT * FROM staffacc WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
    //CREATE A NEW USER
    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO staffacc (`staffNo`,`email`,`userName`,`psd`, `profilePic`,`dateCreated`,`lastLogin`) VALUE (?)";

    const values = [
      req.body.id,
      req.body.email,
      req.body.userName,
      hashedPassword,
      "N/A",
      moment(Date.now()).format("YYYY-DD-MM HH:mm:ss"),
      "N/A",
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

const login = (req, res) => {
  const q = "SELECT * FROM staffacc WHERE userName = ?";

  db.query(q, [req.body.userName], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
    const { psd, ...others } = data[0];

    const checkPassword = bcrypt.compareSync(req.body.password, psd);

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");

    const token = jwt.sign({ id: data[0].id }, process.env.SECRETKEY);
    //  attachCookiesToResponse({ res, token });
    const oneDay = 1000 * 60 * 60 * 24;

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        // secure: process.env.NODE_ENV === 'production',
        secure: true,
      })
      .status(200)
      .json(others);
    // res.status(200).send(others);
  });
};

const logout = (req, res) => {
  res
    .cookie("accessToken", "logout", {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
    })
    .status(200)
    .json("User has been logged out.");
};

const updateUser = (req, res) => {
  let token;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  // check cookies
  if (req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }
  // token = req.cookies.accessToken;
  if (!token) return res.status(401).json('Not authenticated');

  jwt.verify(token, process.env.SECRETKEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    if (req.params.id === userInfo.id)
      return res.status(500).json("You can update only your post!");

    const q = "UPDATE staffacc SET `userName`=?,`email`=? WHERE `id`=? ";

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

module.exports = {
  logout,
  login,
  register,
  updateUser,
};
