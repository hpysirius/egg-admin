'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('articles', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      category_id: INTEGER,
      content: TEXT,
      title: STRING(100),
      keywords: STRING(200),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 articles 表
  down: async queryInterface => {
    await queryInterface.dropTable('articles');
  },
};
