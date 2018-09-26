'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const ArticleCategory = app.model.define('article', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    category_id: INTEGER,
    content: TEXT,
    title: STRING(100),
    keywords: STRING(200),
    created_at: DATE,
    updated_at: DATE,
    isDel: { type: INTEGER, defaultValue: 0 },
  });
  ArticleCategory.sync({ alter: true });
  return ArticleCategory;
};
