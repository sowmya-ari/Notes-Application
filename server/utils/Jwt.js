const jwt = require("jsonwebtoken");
require("dotenv").config();

var signature = process.env.secretOrKey;
var options = { expiresIn: process.env.expiresIn };

const GenerateToken = function(id) {
  const payload = {
    id: id
  };
  const token = jwt.sign(payload, signature, options);
  return token;
};

const ValidateToken = function(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    try {
      const result = jwt.verify(token, signature, options);
      req.decoded = result;
      next();
    } catch (err) {
      result = {
        error: "Token required",
        status: 403
      };
      return result;
    }
  } else {
    result = {
      error: "Authentication error. Valid Token required.",
      status: 401
    };
    res.json({
      result: result
    });
  }
};

module.exports = {
  GenerateToken,
  ValidateToken
};
