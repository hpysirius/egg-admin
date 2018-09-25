'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('article', '/web/article/getCategory', controller.article.getCategory);
  router.post('article', '/web/article/category', controller.article.categoryList);
  router.post('article', '/web/article/categoryAdd', controller.article.categoryAdd);
  router.post('article', '/web/article/categoryEdit', controller.article.categoryEdit);
};
