const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
      issuer: "postify-api",
    }
  );
};

module.exports = generateToken;
