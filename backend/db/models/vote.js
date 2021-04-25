'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    value: {
      allowNull: false,
      type: Sequelize.BOOLEAN
    },
    citizen_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    solution_id: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
  }, {});
  Vote.associate = function(models) {
    // associations can be defined here
    Vote.belongsTo(models.User, {
      foreignkey: "citizen_id",
      as: "citizen"
    })
    Vote.belongsTo(models.Solution, {
      foreignkey: "solution_id",
      as: "solution"
    })
  };
  return Vote;
};