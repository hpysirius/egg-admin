'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    email: STRING(50),
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });
  User.sync({alter: true});
  return User;
};