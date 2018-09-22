'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/web/user/login', controller.users.login);
  router.post('users', '/web/users/list', controller.users.list);
  router.post('users', '/web/users/add', controller.users.create);
  router.post('users', '/web/users/edit', controller.users.update);
  router.post('users', '/web/users/del', controller.users.destroy);
};
