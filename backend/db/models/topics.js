'use strict';
module.exports = (sequelize, DataTypes) => {
  const topics = sequelize.define('topics', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(100),
      unique: true
    },
  }, {});
  topics.associate = function(models) {
    // associations can be defined here
  };
  return topics;
};