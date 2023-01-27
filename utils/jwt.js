const jwt = require("jsonwebtoken");

const oneDay = 1000 * 60 * 60 * 24;

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.SECRETKEY, {
    //will check
    expiresIn: new Date(Date.now() + oneDay),
  });
  return token;
};

const isTokenValid = ({ token }) => jwt.verify(token, process.env.SECRETKEY);

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });

  // const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    // secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
