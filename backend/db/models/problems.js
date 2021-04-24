'use strict';
module.exports = (sequelize, DataTypes) => {
  const Problems = sequelize.define('Problems', {
    title: DataTypes.STRING,
    summary: DataTypes.STRING,
    description: DataTypes.STRING,
    images: DataTypes.ARRAY,
    references: DataTypes.ARRAY,
    region_id: DataTypes.INTEGER,
    topic_id: DataTypes.INTEGER
  }, {});
  Problems.associate = function(models) {
    // associations can be defined here
  };
  return Problems;
};