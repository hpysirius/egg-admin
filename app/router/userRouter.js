'use strict';

module.exports = app => {
  const { router, controller } = app;
  const checkLogin = app.middleware.checkLogin({ checkAdmin: true });
  router.post('users', '/web/users/login', controller.users.login);
  router.post('users', '/web/users/logout', controller.users.logout);
  router.post('users', '/web/users/list', checkLogin, controller.users.list);
  router.post('users', '/web/users/add', checkLogin, controller.users.create);
  router.post('users', '/web/users/edit', checkLogin, controller.users.update);
  router.post('users', '/web/users/del', checkLogin, controller.users.del);
  router.post('users', '/web/users/updatePassword', checkLogin, controller.users.updatePassword);
  router.post('users', '/web/users/getCaptcha', controller.users.getCaptcha);
};
