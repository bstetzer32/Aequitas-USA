'use strict';
module.exports = (sequelize, DataTypes) => {
  const Office = sequelize.define('Office', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    verified: {
      allowNull: false,
      type: Sequelize.BOOLEAN,
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
      foreignKey: "regionId",
      as: "region"
    });
    Office.belongsTo(models.User, {
      foreignKey: "incumbantId",
      as: "incumbant"
    })
    Office.hasMany(models.Leadership, {
      foreignKey: "officeId",
      as: "office"
    })
    Office.hasMany(models.Commitee, {
      foreignKey: "officeId",
      as: "office"
    })
  };
  return Office;
};