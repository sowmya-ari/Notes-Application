const models = require("../models/Index");

const CreateUser = async function(user) {
  try {
    const result = await models.Users.create({
      username: user.username,
      password: user.password
    });
    return result;
  } catch (error) {
    throw Error("Unable to create user");
  }
};

const GetUser = async function(user) {
  try {
    const result = await models.Users.findOne({
      where: {
        username: user.username
      }
    });
    return result;
  } catch (error) {
    throw Error("Unable to get user");
  }
};

module.exports = {
  CreateUser,
  GetUser
};
