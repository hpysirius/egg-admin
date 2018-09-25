'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ArticleCategory = app.model.define('article_category', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    pid: INTEGER,
    created_at: DATE,
    updated_at: DATE,
    isDel: { type: INTEGER, defaultValue: 0 },
  });
  ArticleCategory.sync({ alter: true });
  return ArticleCategory;
};
