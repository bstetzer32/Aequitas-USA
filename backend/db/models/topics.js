'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(100),
      unique: true
    },
  }, {});
  Topic.associate = function(models) {
    // associations can be defined here
    Topic.hasMany(models.Problem, {
      foreignkey: "topic_id",
      as: "topic"
    })
  };
  return Topic;
};