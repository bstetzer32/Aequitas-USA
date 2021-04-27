'use strict';
module.exports = (sequelize, DataTypes) => {
  const Solution = sequelize.define('Solution', {
      thesis: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          max: 100,
          min:10
        }
      },
      proposal: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          max: 10000,
          min:1000
        }
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING(100))
      },
      references: {
        type: DataTypes.ARRAY(DataTypes.STRING(100))
      },
      citizenId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      problemId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
  }, {});
  Solution.associate = function(models) {
    // associations can be defined here
    // Solution.belongsTo(models.User, {
    //   foreignKey: "citizenId"
    // })
    // Solution.belongsTo(models.Problem, {
    //   foreignKey: "problemId"
    // })
    // Solution.hasMany(models.Vote, {
    //   foreignKey: "solutionId"
    // })
    Solution.hasMany(models.SolutionReference, {
      foreignKey: "solutionId"
    })
    Solution.hasMany(models.SolutionPhoto, {
      foreignKey: "solutionId"
    })
  };
  return Solution;
};