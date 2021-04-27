'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProblemSubscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subscriberId: {
        allowNull: false,
        unique: 'actionsUnique',
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users"
          }
        }
      },
      problemId: {
        allowNull: false,
        unique: 'actionsUnique',
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Problems"
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProblemSubscriptions');
  }
};