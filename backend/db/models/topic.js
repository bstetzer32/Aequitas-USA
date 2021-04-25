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
      foreignKey: "topicId",
      as: "topic"
    })
  };
  return Topic;
};