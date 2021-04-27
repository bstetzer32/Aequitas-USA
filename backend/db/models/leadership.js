'use strict';
module.exports = (sequelize, DataTypes) => {
  const Leadership = sequelize.define('Leadership', {
    citizenId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    officeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, {});
  Leadership.associate = function(models) {
    // associations can be defined here
    Leadership.belongsTo(models.User, {
      foreignKey: "citizenId"
    })
    Leadership.belongsTo(models.Office, {
      foreignKey: "officeId"
    })
  };
  return Leadership;
};