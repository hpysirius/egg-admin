'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.resources('home', '/', controller.home);
  router.post('users', '/web/users/list', controller.users.index);
  router.post('users', '/web/users/add', controller.users.create);
};