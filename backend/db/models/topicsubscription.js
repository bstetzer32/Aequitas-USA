'use strict';
module.exports = (sequelize, DataTypes) => {
  const TopicSubscription = sequelize.define('TopicSubscription', {
    topicId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  TopicSubscription.associate = function(models) {
    // associations can be defined here
    TopicSubscription.belongsToMany(models.User, {
      otherKey: "subscriberId",
      as: "Subscriber",
      through: "Subscriptions",
      foreignKey: "topicSubscriptionId",
    });
  };
  return TopicSubscription;
};