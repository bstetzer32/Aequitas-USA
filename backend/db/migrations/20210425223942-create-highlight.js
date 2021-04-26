'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Highlights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      problemId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: 'actionsUnique',
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
    },  
    {
      uniqueKeys: {
        actionsUnique: {
          fields: ['citizenId', 'problemId']
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Highlights');
  }
};