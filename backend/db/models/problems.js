'use strict';
module.exports = (sequelize, DataTypes) => {
  const Problems = sequelize.define('Problems', {
    title: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    summary: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING(100))
    },
    references: {
      type: DataTypes.ARRAY(DataTypes.STRING(100))
    },
    status: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    citizen_id: {
      type: DataTypes.INTEGER
    },
    region_id: {
      type: DataTypes.INTEGER
    },
    topic_id: {
      type: DataTypes.INTEGER
    },
  }, {});
  Problems.associate = function(models) {
    // associations can be defined here
    Problems.belongsTo(models.User, {
      foreignkey: "citizen_id",
      as: "citizen"
    })
    Problems.belongsTo(models.Region, {
      foreignkey: "region_id",
      as: "region"
    })
    Problems.belongsTo(models.Topic, {
      foreignkey: "topics_id",
      as: "topics"
    })
  };
  return Problems;
};