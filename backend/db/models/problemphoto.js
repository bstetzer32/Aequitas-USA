'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProblemPhoto = sequelize.define('ProblemPhoto', {
    problemId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    photoUrl: {
      allowNull: false,
      type: DataTypes.STRING(1000)
    }
  }, {});
  ProblemPhoto.associate = function(models) {
    // associations can be defined here
    ProblemPhoto.belongsTo(models.Problem, {
      foreignKey: "problemId"
    })
  };
  return ProblemPhoto;
};