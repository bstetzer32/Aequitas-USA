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
    // RegionSubscription.belongsToMany(models.User, {
    //   otherKey: "subscriberId",
    //   through: "Subscriptions",
    //   foreignKey: "regionSubscriptionId",
    // });
  };
  return RegionSubscription;
};