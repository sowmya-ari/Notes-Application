const services = require("../services/Users");
const validations = require("../validations/UserSchema");
const password = require("../utils/Password");
const jwt = require("../utils/Jwt");

const Register = async function(req, res) {
  const { value, error } = validations.RegisteringUser(req.body);
  if (error) {
    return res.json({
      status: 401,
      message: error.details[0].message
    });
  }
  const user = await services.GetUser(req.body);
  if (user) {
    return res.json({
      status: 409,
      message: "Username already exist"
    });
  } else {
    try {
      req.body.password = await password.HashPassword(req.body.password);
      const user = await services.CreateUser(req.body);
      return res.json({
        status: 201,
        result: user
      });
    } catch (error) {
      return res.json({
        status: 500,
        error: error
      });
    }
  }
};

const Login = async function(req, res) {
  const { value, error } = validations.LoginUser(req.body);
  if (error) {
    return res.json({
      status: 401,
      message: error.details[0].message
    });
  } else {
    try {
      const user = await services.GetUser(req.body);
      if (!user) {
        return res.json({
          status: 403,
          message: "User not found"
        });
      } else {
        const { result } = password.VerifyPassword(
          req.body.password,
          user.password
        );
        if (result.success == true) {
          const token = jwt.GenerateToken(user.id);
          return res.json({
            status: 201,
            message: result.message,
            token: token,
            id: user.id
          });
        } else {
          return res.json({
            status: 403,
            message: message.message
          });
        }
      }
    } catch (error) {
      return res.json({
        status: 500,
        error: error
      });
    }
  }
};

module.exports = {
  Register,
  Login
};
