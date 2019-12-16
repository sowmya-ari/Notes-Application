const chai = require("chai");
chai.use(require("sinon-chai"));

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require("sequelize-test-helpers");
const notesModel = require("../models/Notes");

describe("Testing notes model", () => {
  const notes = notesModel(sequelize, dataTypes);
  const instance = new notes();

  checkModelName(notes)("Notes");

  context("Testing the model properties", () => {
    ["user_id", "title", "content", "color"].forEach(
      checkPropertyExists(instance)
    );
  });
});
