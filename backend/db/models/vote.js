'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    value: {
      allowNull: false,
      type: DataTypes.BOOLEAN
    },
    citizenId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    solutionId: {
      allowNull: false,
      type: DataTypes.INTEGER
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
    // Vote.belongsTo(models.User, {
    //   foreignKey: "citizenId",
    // })
    // Vote.belongsTo(models.Solution, {
    //   foreignKey: "solutionId",
    // })
  };
  return Vote;
};