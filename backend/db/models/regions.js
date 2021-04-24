'use strict';
module.exports = (sequelize, DataTypes) => {
  const Regions = sequelize.define('Regions', {
      name: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      level: {
        allowNull: false,
        type: DataTypes.STRING(100)
      }
  }, {});
  Regions.associate = function(models) {
    // associations can be defined here
    Regions.hasMany(models.Offices, {
      foreignkey: "region_id",
      as: "region"
    })
  };
  return Regions;
};