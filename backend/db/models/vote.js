'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    value: {
      allowNull: false,
      type: Sequelize.BOOLEAN
    },
    citizenId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    solutionId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
  }, {});
  Vote.associate = function(models) {
    // associations can be defined here
    Vote.belongsTo(models.User, {
      foreignkey: "citizenId",
      as: "citizen"
    })
    Vote.belongsTo(models.Solution, {
      foreignkey: "solutionId",
      as: "solution"
    })
  };
  return Vote;
};