'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topics = sequelize.define('Topics', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(100),
      unique: true
    },
  }, {});
  Topics.associate = function(models) {
    // associations can be defined here
  };
  return Topics;
};