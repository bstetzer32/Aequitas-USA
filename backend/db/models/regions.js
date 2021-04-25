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
      foreignkey: "region_id",
      as: "region"
    })
    Region.hasMany(models.Problem, {
      foreignkey: "region_id",
      as: "region"
    })
  };
  return Region;
};