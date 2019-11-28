const crypto = require("crypto");

const HashPassword = function(password) {
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(password)
    .digest("base64");
  password = salt + "$" + hash;
  return password;
};

const VerifyPassword = function(password, hashedPassword) {
  let splits = hashedPassword.split("$");
  let salt = splits[0];
  let hash = crypto
    .createHmac("sha512", salt)
    .update(password)
    .digest("base64");
  password = salt + "$" + hash;
  let result = {};
  if (password == hashedPassword) {
    result.success = true;
    result.message = "Password is correct";
  } else {
    result.success = false;
    result.message = "Password is invalid";
  }
  return {
    result
  };
};

module.exports = {
  HashPassword,
  VerifyPassword
};
