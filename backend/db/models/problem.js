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
    Problem.belongsTo(models.User, {
      foreignkey: "citizenId",
      as: "citizen"
    })
    Problem.belongsTo(models.Region, {
      foreignkey: "regionId",
      as: "region"
    })
    Problem.belongsTo(models.Topic, {
      foreignkey: "topicsId",
      as: "topics"
    })
    Problem.hasMany(models.Commitee, {
      foreignkey: "problemId",
      as: "problem"
    })
    Problem.hasMany(models.Solution, {
      foreignkey: "problemId",
      as: "problem"
    })
  };
  return Problem;
};