"use strict";

const Sequelize = require("sequelize");
const env = require("./env");
const sequelize = new Sequelize(
  env.POSTGRES_DATABASE,
  env.POSTGRES_USERNAME,
  env.POSTGRES_PASSWORD,
  {
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    dialect: env.POSTGRES_DIALECT,
    define: {
      underscored: true
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;
