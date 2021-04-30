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
         summary: faker.lorem.sentence(),
         description: faker.lorem.sentence(),
         status: i % 2 ? true : false,
         citizenId: (i % 3) + 4,
         regionId: (i % 51) + 51,
         topicId: (i % 7) + 8
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
