'use strict';

module.exports = app => {
  const { router, controller } = app;
  const checkLogin = app.middleware.checkLogin({ checkAdmin: true });
  // 图片列表
  router.post('pic', '/web/pic/list', checkLogin, controller.pic.getPicList);
  router.post('pic', '/web/pic/add', controller.pic.picCreate);
  router.post('pic', '/web/file/upload', controller.pic.upload);
};
