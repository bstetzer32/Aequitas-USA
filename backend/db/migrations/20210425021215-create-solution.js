'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Solutions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
          min:10
        }
      },
      images: {
        type: Sequelize.ARRAY(Sequelize.STRING(100))
      },
      references: {
        type: Sequelize.ARRAY(Sequelize.STRING(100))
      },
      citizen_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users"
          }
        }
      },
      problem_id: {
        allowNull: false,
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
    return queryInterface.dropTable('Solutions');
  }
};