'use strict';
module.exports = (sequelize, DataTypes) => {
  const RegionSubscription = sequelize.define('RegionSubscription', {
    leader: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    regionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    subscriberId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  });
  RegionSubscription.associate = function(models) {
    // associations can be defined here
    RegionSubscription.belongsTo(models.User, {
      foreignKey: "subscriberId"
    })
    RegionSubscription.belongsTo(models.Region, {
      foreignKey: "regionId"
    })
  };
  return RegionSubscription;
};