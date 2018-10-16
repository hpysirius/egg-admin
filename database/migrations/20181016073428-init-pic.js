'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('pic', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      category_id: INTEGER,
      author: STRING(20),
      url: STRING(100),
      title: STRING(100),
      keywords: STRING(200),
      created_at: DATE,
      updated_at: DATE,
      isDel: { type: INTEGER, defaultValue: 0 },
    });
  },
  // 在执行数据库降级时调用的函数，删除 pic 表
  down: async queryInterface => {
    await queryInterface.dropTable('pic');
  },
};
