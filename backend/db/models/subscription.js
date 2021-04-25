'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    subscriberId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    userSubscriptionId: {
      type: DataTypes.INTEGER
    },
    officeSubscriptionId: {
      type: DataTypes.INTEGER
    },
    problemSubscriptionId: {
      type: DataTypes.INTEGER
    },
    solutionSubscriptionId: {
      type: DataTypes.INTEGER
    },
    regionSubscriptionId: {
      type: DataTypes.INTEGER
    },
    topicSubscriptionId: {
      type: DataTypes.INTEGER
    }
  }, {});
  Subscription.associate = function(models) {
    // associations can be defined here
  };
  return Subscription;
};