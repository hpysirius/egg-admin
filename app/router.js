'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.resources('home', '/', controller.home);
  require('./router/userRouter')(app);
  require('./router/articleRouter')(app);
  require('./router/picRouter')(app);
};
