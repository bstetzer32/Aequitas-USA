'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Regions', [{
     name: 'United States',
     level: 'country'
   },{
     name: 'Alabama',
     level: 'administrativeArea1'
   },{
     name: 'Alaska',
     level: 'administrativeArea1'
   },{
     name: 'Arizona',
     level: 'administrativeArea1'
   },{
     name: 'Arkansas',
     level: 'administrativeArea1'
   },{
     name: 'California',
     level: 'administrativeArea1'
   },{
     name: 'Colorado',
     level: 'administrativeArea1'
   },{
     name: 'Connecticut',
     level: 'administrativeArea1'
   },{
     name: 'Delaware',
     level: 'administrativeArea1'
   },{
     name: 'Florida',
     level: 'administrativeArea1'
   },{
     name: 'Georgia',
     level: 'administrativeArea1'
   },{
     name: 'Hawaii',
     level: 'administrativeArea1'
   },{
     name: 'Idaho',
     level: 'administrativeArea1'
   },{
     name: 'Illinois',
     level: 'administrativeArea1'
   },{
     name: 'Indiana',
     level: 'administrativeArea1'
   },{
     name: 'Iowa',
     level: 'administrativeArea1'
   },{
     name: 'Kansas',
     level: 'administrativeArea1'
   },{
     name: 'Kentucky',
     level: 'administrativeArea1'
   },{
     name: 'Louisiana',
     level: 'administrativeArea1'
   },{
     name: 'Maine',
     level: 'administrativeArea1'
   },{
     name: 'Maryland',
     level: 'administrativeArea1'
   },{
     name: 'Massachusetts',
     level: 'administrativeArea1'
   },{
     name: 'Michigan',
     level: 'administrativeArea1'
   },{
     name: 'Minnesota',
     level: 'administrativeArea1'
   },{
     name: 'Mississippi',
     level: 'administrativeArea1'
   },{
     name: 'Missouri',
     level: 'administrativeArea1'
   },{
     name: 'Montana',
     level: 'administrativeArea1'
   },{
     name: 'Nebraska',
     level: 'administrativeArea1'
   },{
     name: 'Nevada',
     level: 'administrativeArea1'
   },{
     name: 'New Hampshire',
     level: 'administrativeArea1'
   },{
     name: 'New Jersey',
     level: 'administrativeArea1'
   },{
     name: 'New Mexico',
     level: 'administrativeArea1'
   },{
     name: 'New York',
     level: 'administrativeArea1'
   },{
     name: 'North Carolina',
     level: 'administrativeArea1'
   },{
     name: 'North Dakota',
     level: 'administrativeArea1'
   },{
     name: 'Ohio',
     level: 'administrativeArea1'
   },{
     name: 'Oklahoma',
     level: 'administrativeArea1'
   },{
     name: 'Oregon',
     level: 'administrativeArea1'
   },{
     name: 'Pennsylvania',
     level: 'administrativeArea1'
   },{
     name: 'Rhode Island',
     level: 'administrativeArea1'
   },{
     name: 'South Carolina',
     level: 'administrativeArea1'
   },{
     name: 'South Dakota',
     level: 'administrativeArea1'
   },{
     name: 'Tennessee',
     level: 'administrativeArea1'
   },{
     name: 'Texas',
     level: 'administrativeArea1'
   },{
     name: 'Utah',
     level: 'administrativeArea1'
   },{
     name: 'Vermont',
     level: 'administrativeArea1'
   },{
     name: 'Virginia',
     level: 'administrativeArea1'
   },{
     name: 'Washington',
     level: 'administrativeArea1'
   },{
     name: 'West Virginia',
     level: 'administrativeArea1'
   },{
     name: 'Wisconsin',
     level: 'administrativeArea1'
   },{
     name: 'Wyoming',
     level: 'administrativeArea1'
   }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Regions', null, {});
  }
};
