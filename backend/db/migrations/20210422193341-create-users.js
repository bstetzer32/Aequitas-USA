'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(30),
        unique: true
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(256),
        unique: true
      },
      addressLineOne: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      addressLineTwo: {
        type: Sequelize.STRING(100),
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(2),
      },
      zipCode: {
        allowNull: false,
        type: Sequelize.STRING(5),
      },
      authenticated: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      hashedPassword: {
        allowNull: false,
        type: Sequelize.STRING.BINARY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};