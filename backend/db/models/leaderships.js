'use strict';
module.exports = (sequelize, DataTypes) => {
  const Leadership = sequelize.define('Leadership', {
    citizen_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    office_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    leader_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
    }
  }, {});
  Leadership.associate = function(models) {
    // associations can be defined here
    Leadership.belongsTo(models.User, {
      foreignkey: "citizen_id",
      as: "citizen"
    })
    Leadership.belongsTo(models.User, {
      foreignkey: "citizen_id",
      as: "leader"
    })
    Leadership.belongsTo(models.Office, {
      foreignkey: "office_id",
      as: "office"
    })
  };
  return Leadership;
};