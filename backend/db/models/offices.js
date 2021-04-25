'use strict';
module.exports = (sequelize, DataTypes) => {
  const Office = sequelize.define('Office', {
      name: {
        allowNull: false,
        type: DataTypes.STRING(100)
      },
      incumbant_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      region_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
  }, {});
  Office.associate = function(models) {
    Office.belongsTo(models.Region, {
      foreignkey: "region_id",
      as: "region"
    });
    Office.belongsTo(models.User, {
      foreignkey: "incumbant_id",
      as: "incumbant"
    })
  };
  return Office;
};