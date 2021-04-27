'use strict';
module.exports = (sequelize, DataTypes) => {
  const SolutionReference = sequelize.define('SolutionReference', {
    solutionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    referenceUrl: {
      allowNull: false,
      type: DataTypes.STRING(1000)
    }
  }, {});
  SolutionReference.associate = function(models) {
    // associations can be defined here
    SolutionReference.belongsTo(models.Problem, {
      foreignKey: "solutionId"
    })
  };
  return SolutionReference;
};