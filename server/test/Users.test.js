const chai = require("chai");
const expect = chai.expect;
chai.use(require("sinon-chai"));

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require("sequelize-test-helpers");
const usersModel = require("../models/Users");

describe("Testing notes model", () => {
  const Users = usersModel(sequelize, dataTypes);
  const instance = new Users();

  checkModelName(Users)("Users");

  context("Testing the model properties", () => {
    ["username", "password"].forEach(checkPropertyExists(instance));
  });
});
