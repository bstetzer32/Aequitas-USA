'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        addressLineOne: '1600 Pennsylvania Avenue NW',
        city: 'Washington',
        state: 'DC',
        zipCode: '20500',
        authenticated: true,
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser1',
        addressLineOne: '1600 Pennsylvania Avenue NW',
        city: 'Washington',
        state: 'DC',
        zipCode: '20500',
        authenticated: true,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser2',
        addressLineOne: '1600 Pennsylvania Avenue NW',
        city: 'Washington',
        state: 'DC',
        zipCode: '20500',
        authenticated: true,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
