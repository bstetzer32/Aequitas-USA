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
      leader: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      subscriberId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users"
          }
        }
      },
      regionId: {
        allowNull: false,
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
    {
      uniqueKeys: {
        actionsUnique: {
          fields: ['subscriberId', 'regionId']
        }
      }
    }  
);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RegionSubscriptions');
  }
};

