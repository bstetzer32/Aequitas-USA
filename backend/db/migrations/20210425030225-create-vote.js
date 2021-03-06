'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Votes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      value: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      citizenId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: 'actionsUnique',
        references: {
          model: {
            tableName: "Users"
          }
        }
      },
      solutionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: 'actionsUnique',
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
    },  
    {
      uniqueKeys: {
        actionsUnique: {
          fields: ['citizenId', 'solutionId']
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Votes');
  }
};