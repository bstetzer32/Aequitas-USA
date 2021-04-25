'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProblemSubscription = sequelize.define('ProblemSubscription', {
    problemId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  ProblemSubscription.associate = function(models) {
    // associations can be defined here
    ProblemSubscription.belongsToMany(models.User, {
      otherKey: "subscriberId",
      as: "Subscriber",
      through: "Subscriptions",
      foreignKey: "problemSubscriptionId",
    });
  };
  return ProblemSubscription;
};