'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RegionSubscriptions', {
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
      regionId: {
        allowNull: false,
        unique: 'actionsUnique',
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Regions"
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
);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RegionSubscriptions');
  }
};

    // {
    //   uniqueKeys: {
    //     actionsUnique: {
    //       fields: ['subscriberId', 'regionId']
    //     }
    //   }
    // }