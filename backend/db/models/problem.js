'use strict';
module.exports = (sequelize, DataTypes) => {
  const Problem = sequelize.define('Problem', {
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
    citizenId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    regionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    topicId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  Problem.associate = function(models) {
    // associations can be defined here
    // Problem.belongsTo(models.User, {
    //   foreignKey: "citizenId"
    // })
    // Problem.belongsTo(models.Region, {
    //   foreignKey: "regionId"
    // })
    // Problem.belongsTo(models.Topic, {
    //   foreignKey: "topicsId"
    // })
    // Problem.hasMany(models.Commitee, {
    //   foreignKey: "problemId"
    // })
    // Problem.hasMany(models.Solution, {
    //   foreignKey: "problemId"
    // })
    // Problem.hasMany(models.Highlight, {
    //   foreignKey: "problemId"
    // })
  };
  return Problem;
};