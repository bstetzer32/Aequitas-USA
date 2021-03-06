'use strict';
module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define('Region', {
      name: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      level: {
        allowNull: false,
        type: DataTypes.STRING(100)
      }
  }, {});
  Region.associate = function(models) {
    // associations can be defined here
    Region.hasMany(models.Office, {
      foreignKey: "region"
    })
    Region.hasMany(models.RegionSubscription, {
      foreignKey: "regionId"
    })
    Region.hasMany(models.Problem, {
      foreignKey: "regionId"
    })
  };
  return Region;
};