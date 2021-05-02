'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Topics', [{
     name: 'Community'
   }, {
     name: 'Policy'
   },{
     name: 'Public Works'
   },{
     name: 'Commerce'
   },{
     name: 'Industry'
   },{
     name: 'Crime'
   },{
     name: 'Human Rights'
   }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Topics', null, {});
  }
};
