'use strict';
const faker =  require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const solutionUpload = []
     for (let i = 0; i < 12750; i++) {
       solutionUpload.push({
         title: faker.lorem.words(),
         thesis: faker.lorem.sentence(),
         proposal: faker.lorem.sentence(),
        //  status: i % 2 ? true : false,
         citizenId: (i % 3) + 1,
         problemId: (i % 2550) + 1
        })
      }
      return queryInterface.bulkInsert('Solutions', solutionUpload, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Solutions', null, {});
  }
};
