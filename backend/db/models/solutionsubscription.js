'use strict';
module.exports = (sequelize, DataTypes) => {
  const SolutionSubscription = sequelize.define('SolutionSubscription', {
    solutionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    subscriberId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {indexes: [
      {
        unique: true,
        fields: ['subscriberId', 'solutionId'] 
      }
    ]});
  SolutionSubscription.associate = function(models) {
    // associations can be defined here
    // SolutionSubscription.belongsToMany(models.User, {
    //   otherKey: "subscriberId",
    //   through: "Subscriptions",
    //   foreignKey: "solutionSubscriptionId",
    // });
  };
  return SolutionSubscription;
};