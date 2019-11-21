"use strict";
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const dotenv = require("dotenv");
const Sequelize = require("sequelize");
dotenv.config();
const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USERNAME,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
    define: {
      underscored: true
    }
  }
);
console.log(sequelize);
const db = {};
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./Users.js")(sequelize, Sequelize);
db.Notes = require("./Notes.js")(sequelize, Sequelize);
db.Users.hasMany(db.Notes);
db.Notes.belongsTo(db.Users);

module.exports = db;
