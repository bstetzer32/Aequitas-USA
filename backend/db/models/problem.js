'use strict';
module.exports = (sequelize, DataTypes) => {
  const Problem = sequelize.define('Problem', {
    title: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    summary: {
      allowNull: false,
      type: DataTypes.STRING(1000)
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(10000)
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
    Problem.belongsTo(models.User, {
      foreignKey: "citizenId"
    })
    Problem.belongsTo(models.Region, {
      foreignKey: "regionId"
    })
    Problem.belongsTo(models.Topic, {
      foreignKey: "topicId"
    })
    // Problem.hasMany(models.Commitee, {
    //   foreignKey: "problemId"
    // })
    Problem.hasMany(models.Solution, {
      foreignKey: "problemId"
    })
    // Problem.hasMany(models.Highlight, {
    //   foreignKey: "problemId"
    // })
    Problem.hasMany(models.ProblemReference, {
      foreignKey: "problemId"
    })
    Problem.hasMany(models.ProblemPhoto, {
      foreignKey: "problemId"
    })
  };
  return Problem;
};