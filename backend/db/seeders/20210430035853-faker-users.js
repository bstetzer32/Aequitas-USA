'use strict';
const faker =  require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      */

     const problems = [
       'Affordable Housing Crisis',
       `"Too Big to Fail" Bailouts`,
       'Issues with Public Water Infrastructure',
       'Tech Monopolies and Anti-Trust Law',
       'Microprocessor Shortage',
       'COVID Relief Fraud',
       'Health Insurance Availability'
     ] 
     const problemSummarys = [
       `Nationally, there is a shortage of more than 7 million affordable homes for our nation's 11 million plus extremely low-income families.`,
       'The pandemic was particularly advantageous to large firms in many industries largly due to TBTF subsidies',
       'As many as 63 million people were exposed to potentially unsafe water more than once during the past decade.',
       'A nearly 450-page antitrust report found that Amazon, Apple, Facebook and Google each hold monopoly power and, in some cases, should have parts of their businesses effectively broken up.',
       'Consumer price rises loom while dearth of semiconductors slow production from Samsung to Ford',
       'The Department of Justice has publicly charged 474 defendants with criminal offenses based on fraud schemes connected to the COVID-19 pandemic.',
       'In the first half of 2020, 43.4 percent of U.S. adults ages 19 to 64 were inadequately insured.'
     ]
     const problemUpload = []
     for (let i = 0; i < 2550; i++) {
       problemUpload.push({
         title: problems[i % 7],
         summary: problemSummarys[i % 7],
          description: faker.lorem.paragraphs(7),
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
