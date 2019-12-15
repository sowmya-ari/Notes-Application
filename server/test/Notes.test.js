const chai = require("chai");
const expect = chai.expect;
chai.use(require("sinon-chai"));

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require("sequelize-test-helpers");
const notesModel = require("../models/Notes");

describe("Testing notes model", () => {
  const Notes = notesModel(sequelize, dataTypes);
  const instance = new Notes();

  checkModelName(Notes)("Notes");

  context("Testing the model properties", () => {
    ["user_id", "title", "content", "color"].forEach(
      checkPropertyExists(instance)
    );
  });
});
