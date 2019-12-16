const chai = require("chai");
chai.use(require("sinon-chai"));

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require("sequelize-test-helpers");
const usersModel = require("../models/Users");

describe("Testing notes model", () => {
  const users = usersModel(sequelize, dataTypes);
  const instance = new users();

  checkModelName(users)("Users");

  context("Testing the model properties", () => {
    ["username", "password"].forEach(checkPropertyExists(instance));
  });
});
