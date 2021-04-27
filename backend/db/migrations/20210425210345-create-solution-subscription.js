'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SolutionSubscriptions', {
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
      solutionId: {
        allowNull: false,
        unique: 'actionsUnique',
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Solutions"
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
    return queryInterface.dropTable('SolutionSubscriptions');
  }
};