'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commitee = sequelize.define('Commitee', {
    office_id: {
      type: Sequelize.INTEGER
    },
    problem_id: {
      type: Sequelize.INTEGER
    },
  }, {});
  Commitee.associate = function(models) {
    // associations can be defined here
    Commitee.belongsTo(models.Office, {
      foreignkey: "office_id",
      as: "office"
    })
    Commitee.belongsTo(models.Problem, {
      foreignkey: "problem_id",
      as: "problem"
    })
  };
  return Commitee;
};