'use strict';
module.exports = (sequelize, DataTypes) => {
  const TopicSubscription = sequelize.define('TopicSubscription', {
    topicId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {indexes: [
      {
        unique: true,
        fields: ['subscriberId', 'topicId'] 
      }
    ]});
  TopicSubscription.associate = function(models) {
    // associations can be defined here
    // TopicSubscription.belongsToMany(models.User, {
    //   otherKey: "subscriberId",
    //   through: "Subscriptions",
    //   foreignKey: "topicSubscriptionId",
    // });
  };
  return TopicSubscription;
};