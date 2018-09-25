'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('article_category', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      pid: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('article_category');
  },
};
