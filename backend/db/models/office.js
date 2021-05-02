'use strict';
module.exports = (sequelize, DataTypes) => {
  const Office = sequelize.define('Office', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    verified: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    incumbantId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    region: {
      allowNull: false,
      type: DataTypes.STRING(100)
    }
  }, {});
  Office.associate = function(models) {
    Office.belongsTo(models.Region, {
      foreignKey: "region"
    });
    Office.belongsTo(models.User, {
      foreignKey: "incumbantId"
    })
    Office.hasMany(models.Leadership, {
      foreignKey: "officeId"
    })
    Office.hasMany(models.OfficeSubscription, {
      foreignKey: "officeId"
    })
  };
  return Office;
};