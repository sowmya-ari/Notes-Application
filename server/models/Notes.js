"use strict";
module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define(
    "Notes",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      color: DataTypes.STRING
    },
    {}
  );
  Notes.associate = function(models) {};
  return Notes;
};
