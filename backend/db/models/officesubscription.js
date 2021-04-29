'use strict';
module.exports = (sequelize, DataTypes) => {
  const OfficeSubscription = sequelize.define('OfficeSubscription', {
    leader: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    officeId: {
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
        fields: ['subscriberId', 'officeId'] 
      }
    ]});
  OfficeSubscription.associate = function(models) {
    // associations can be defined here
    // OfficeSubscription.belongsToMany(models.User, {
    //   otherKey: "subscriberId",
    //   through: "Subscriptions",
    //   foreignKey: "officeSubscriptionId",
    // });
  };
  return OfficeSubscription;
};