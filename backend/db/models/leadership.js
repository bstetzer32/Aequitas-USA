'use strict';
module.exports = (sequelize, DataTypes) => {
  const Leadership = sequelize.define('Leadership', {
    citizenId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    officeId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    leaderId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    }
  }, {});
  Leadership.associate = function(models) {
    // associations can be defined here
    Leadership.belongsTo(models.User, {
      foreignKey: "citizenId",
      as: "citizen"
    })
    Leadership.belongsTo(models.User, {
      foreignKey: "citizenId",
      as: "leader"
    })
    Leadership.belongsTo(models.Office, {
      foreignKey: "officeId",
      as: "office"
    })
  };
  return Leadership;
};