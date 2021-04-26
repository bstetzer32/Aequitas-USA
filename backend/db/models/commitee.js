'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commitee = sequelize.define('Commitee', {
    officeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    problemId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  Commitee.associate = function(models) {
    // associations can be defined here
    // Commitee.belongsTo(models.Office, {
    //   foreignKey: "officeId"
    // })
    // Commitee.belongsTo(models.Problem, {
    //   foreignKey: "problemId"
    // })
  };
  return Commitee;
};