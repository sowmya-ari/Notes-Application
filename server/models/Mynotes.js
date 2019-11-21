"use strict";
module.exports = (sequelize, DataTypes) => {
  const Mynotes = sequelize.define(
    "Mynotes",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      color: DataTypes.VARCHAR
    },
    {}
  );
  Mynotes.associate = function(models) {
    // associations can be defined here
  };
  return Mynotes;
};
