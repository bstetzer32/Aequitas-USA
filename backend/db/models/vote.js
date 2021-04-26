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
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['citizenId', 'solutionId'] 
      }
    ]
  });
  Vote.associate = function(models) {
    // associations can be defined here
    Vote.belongsTo(models.User, {
      foreignKey: "citizenId",
      as: "citizen"
    })
    Vote.belongsTo(models.Solution, {
      foreignKey: "solutionId",
      as: "solution"
    })
  };
  return Vote;
};