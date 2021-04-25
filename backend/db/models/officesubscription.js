'use strict';
module.exports = (sequelize, DataTypes) => {
  const OfficeSubscription = sequelize.define('OfficeSubscription', {
    officeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  OfficeSubscription.associate = function(models) {
    // associations can be defined here
    OfficeSubscription.belongsToMany(models.User, {
      otherKey: "subscriberId",
      as: "Subscriber",
      through: "Subscriptions",
      foreignKey: "officeSubscriptionId",
    });
  };
  return OfficeSubscription;
};