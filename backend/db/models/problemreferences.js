'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProblemReference = sequelize.define('ProblemReference', {
    problemId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    referenceUrl: {
      allowNull: false,
      type: DataTypes.STRING(1000)
    }
  }, {});
  ProblemReference.associate = function(models) {
    // associations can be defined here
    ProblemReference.belongsTo(models.Problem, {
      foreignKey: "problemId"
    })
  };
  return ProblemReference;
};