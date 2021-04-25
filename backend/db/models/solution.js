'use strict';
module.exports = (sequelize, DataTypes) => {
  const Solution = sequelize.define('Solution', {
      thesis: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          max: 100,
          min:10
        }
      },
      proposal: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          max: 10000,
          min:1000
        }
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING(100))
      },
      references: {
        type: Sequelize.ARRAY(Sequelize.STRING(100))
      },
      citizenId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      problemId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
  }, {});
  Solution.associate = function(models) {
    // associations can be defined here
    Solution.belongsTo(models.User, {
      foreignKey: "citizenId",
      as: "citizen"
    })
    Solution.belongsTo(models.Problem, {
      foreignKey: "problemId",
      as: "problem"
    })
    Solution.hasMany(models.Vote, {
      foreignKey: "solutionId",
      as: "solution"
    })
  };
  return Solution;
};