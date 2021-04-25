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
    citizen_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    region_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    topic_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {});
  Problem.associate = function(models) {
    // associations can be defined here
    Problem.belongsTo(models.User, {
      foreignkey: "citizen_id",
      as: "citizen"
    })
    Problem.belongsTo(models.Region, {
      foreignkey: "region_id",
      as: "region"
    })
    Problem.belongsTo(models.Topic, {
      foreignkey: "topics_id",
      as: "topics"
    })
    Problem.hasMany(models.Commitee, {
      foreignkey: "problem_id",
      as: "problem"
    })
    Problem.hasMany(models.Solution, {
      foreignkey: "problem_id",
      as: "problem"
    })
  };
  return Problem;
};