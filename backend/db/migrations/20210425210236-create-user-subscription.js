'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UserSubscriptions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subscriberId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: 'actionsUnique',
        references: {
          model: {
            tableName: "Users"
          }
        }
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: 'actionsUnique',
        references: {
          model: {
            tableName: "Users"
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
    return queryInterface.dropTable('UserSubscriptions');
  }
};