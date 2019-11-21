"use strict";
module.exports = (sequelize, DataTypes) => {
  const Mynotes = sequelize.define(
    "Mynotes",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      user_id: {
        type: DataTypes.UUID,
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
