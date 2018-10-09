'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('users', '/web/users/login', controller.users.login);
  router.post('users', '/web/users/list', controller.users.list);
  router.post('users', '/web/users/add', controller.users.create);
  router.post('users', '/web/users/edit', controller.users.update);
  router.post('users', '/web/users/del', controller.users.del);
  router.post('users', '/web/users/updatePassword', controller.users.updatePassword);
  router.post('users', '/web/users/getCaptcha', controller.users.getCaptcha);
};
