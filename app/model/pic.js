'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Pic = app.model.define('pic', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    category_id: INTEGER,
    author: STRING(20),
    url: STRING(200),
    title: STRING(100),
    keywords: STRING(200),
    created_at: DATE,
    updated_at: DATE,
    isDel: { type: INTEGER, defaultValue: 0 },
  });
  Pic.sync({ alter: true });
  return Pic;
};
