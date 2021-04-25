'use strict';
module.exports = (sequelize, DataTypes) => {
  const Office = sequelize.define('Office', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    incumbantId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    regionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {});
  Office.associate = function(models) {
    Office.belongsTo(models.Region, {
      foreignkey: "regionId",
      as: "region"
    });
    Office.belongsTo(models.User, {
      foreignkey: "incumbantId",
      as: "incumbant"
    })
    Office.hasMany(models.Leadership, {
      foreignkey: "officeId",
      as: "office"
    })
    Office.hasMany(models.Commitee, {
      foreignkey: "officeId",
      as: "office"
    })
  };
  return Office;
};