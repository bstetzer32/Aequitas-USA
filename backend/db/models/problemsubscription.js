'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProblemSubscription = sequelize.define('ProblemSubscription', {
    problemId: {
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
        fields: ['subscriberId', 'problemId'] 
      }
    ]});
  ProblemSubscription.associate = function(models) {
    // associations can be defined here
    // ProblemSubscription.belongsToMany(models.User, {
    //   otherKey: "subscriberId",
    //   through: "Subscriptions",
    //   foreignKey: "problemSubscriptionId",
    // });
  };
  return ProblemSubscription;
};