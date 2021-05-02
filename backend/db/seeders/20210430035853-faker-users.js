'use strict';
const faker =  require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      */
     const problemUpload = []
     for (let i = 0; i < 5100; i++) {
       problemUpload.push({
         title: faker.lorem.words(),
         summary: faker.lorem.words(),
         description: faker.lorem.sentence(),
         status: i % 2 ? true : false,
         citizenId: (i % 3) + 1,
         regionId: (i % 51) + 1,
         topicId: (i % 7) + 1
        })
      }
      return queryInterface.bulkInsert('Problems', problemUpload, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Problems', null, {});
  }
};
