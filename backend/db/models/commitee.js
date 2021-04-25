'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commitee = sequelize.define('Commitee', {
    officeId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    problemId: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
  }, {});
  Commitee.associate = function(models) {
    // associations can be defined here
    Commitee.belongsTo(models.Office, {
      foreignkey: "officeId",
      as: "office"
    })
    Commitee.belongsTo(models.Problem, {
      foreignkey: "problemId",
      as: "problem"
    })
  };
  return Commitee;
};