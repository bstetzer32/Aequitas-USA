'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSubscription = sequelize.define('UserSubscription', {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  UserSubscription.associate = function(models) {
    // associations can be defined here
    // UserSubscription.belongsToMany(models.User, {
    //   otherKey: "subscriberId",
    //   through: "Subscriptions",
    //   foreignKey: "userSubscriptionId",
    // });
  };
  return UserSubscription;
};