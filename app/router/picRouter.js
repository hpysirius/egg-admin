'use strict';

module.exports = app => {
  const { router, controller } = app;
  const checkLogin = app.middleware.checkLogin({ checkAdmin: true });
  // 图片列表
  router.post('pic', '/web/pic/list', checkLogin, controller.pic.getPicList);
  router.post('pic', '/web/pic/add', checkLogin, controller.pic.picCreate);
  router.post('pic', '/web/pic/edit', checkLogin, controller.pic.picEdit);
  router.post('pic', '/web/pic/detail', checkLogin, controller.pic.getDetail);
  router.post('pic', '/web/file/upload', controller.pic.upload);
};
