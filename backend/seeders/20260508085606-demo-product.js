"use strict";

/** @type {import('sequelize-cli').Migration} */
const { data } = require("./data");
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Products", data);
  },

  async down(queryInterface, Sequelize) {
    // Truncates or deletes all records matching the IDs inserted above
    return queryInterface.bulkDelete("Products", null, {});
  },
};
