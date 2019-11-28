const joi = require("@hapi/joi");

const RegisteringUser = function(user) {
  const schema = {
    username: joi.string().required(),
    password: joi
      .string()
      .min(6)
      .max(10)
      .required(),
    retype_password: joi.ref("password")
  };
  return joi.validate(user, schema);
};

const LoginUser = function(user) {
  const schema = {
    username: joi.string().required(),
    password: joi.string().required()
  };
  return joi.validate(user, schema);
};

module.exports = {
  RegisteringUser,
  LoginUser
};
