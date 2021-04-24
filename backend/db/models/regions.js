'use strict';
module.exports = (sequelize, DataTypes) => {
  const regions = sequelize.define('regions', {
      name: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      level: {
        allowNull: false,
        type: DataTypes.STRING(100)
      }
  }, {});
  regions.associate = function(models) {
    // associations can be defined here
  };
  return regions;
};