'use strict';
module.exports = (sequelize, DataTypes) => {
  const SolutionSubscription = sequelize.define('SolutionSubscription', {
    solutionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  SolutionSubscription.associate = function(models) {
    // associations can be defined here
    SolutionSubscription.belongsToMany(models.User, {
      otherKey: "subscriberId",
      as: "Subscriber",
      through: "Subscriptions",
      foreignKey: "solutionSubscriptionId",
    });
  };
  return SolutionSubscription;
};