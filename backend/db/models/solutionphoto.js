'use strict';
module.exports = (sequelize, DataTypes) => {
  const SolutionPhoto = sequelize.define('SolutionPhoto', {
    solutionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    photoUrl: {
      allowNull: false,
      type: DataTypes.STRING(1000)
    }
  }, {});
  SolutionPhoto.associate = function(models) {
    // associations can be defined here
    SolutionPhoto.belongsTo(models.Problem, {
      foreignKey: "solutionId"
    })
  };
  return SolutionPhoto;
};