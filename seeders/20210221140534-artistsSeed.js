'use strict';
const { hashPassword } =  require ('../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const artists = require('../seedDataJSON/artists.json')
    artists.forEach(item => {
      item.password = hashPassword(item.password)
      item.createdAt = new Date()
      item.updatedAt = new Date()
    })
    await queryInterface.bulkInsert('Artists', artists, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Artists')
  }
};
