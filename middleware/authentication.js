// const db = require("../connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateUser = (req, res, next) => {
  let token;
  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  // check cookies
  if (req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  //   if (!token) {
  //     throw new CustomError.UnauthenticatedError("Authentication invalid");
  //   }
  //   try {
  //     const payload = isTokenValid(token);

  //     // Attach the user and his permissions to the req object
  //     req.user = {
  //       userId: payload.user.userId,
  //       role: payload.user.role,
  //     };
  if (!token) return res.status(401).json("Not authenticated");

  jwt.verify(token, process.env.SECRETKEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    // if (req.params.id !== userInfo.id)
    //   return res.status(403).json("Not authenticated!");
    // console.log("lisen");
    next();
  });

  //   } catch (error) {
  //     throw new CustomError.UnauthenticatedError("Authentication invalid");
  //   }
};
module.exports = authenticateUser;
