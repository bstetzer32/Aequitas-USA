'use strict';
module.exports = (sequelize, DataTypes) => {
  const Offices = sequelize.define('Offices', {
      name: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      incumbant_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      region_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
  }, {});
  Offices.associate = function(models) {
    Offices.belongsTo(models.Regions, {
      foreignkey: "region_id",
      as: "region"
    });
    Offices.belongsTo(models.Users, {
      foreignkey: "incumbant_id",
      as: "incumbant"
    })
  };
  return Offices;
};