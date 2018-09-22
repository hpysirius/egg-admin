'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.resources('home', '/', controller.home);
  require('./router/userRouter')(app);
};
