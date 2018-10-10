'use strict';

module.exports = app => {
  const { router, controller } = app;
  const checkLogin = app.middleware.checkLogin({ checkAdmin: true });
  // 文章分类
  router.post('article', '/web/article/getCategory', checkLogin, controller.articleCategory.getCategory);
  router.post('article', '/web/article/category', checkLogin, controller.articleCategory.categoryList);
  router.post('article', '/web/article/categoryAdd', checkLogin, controller.articleCategory.categoryAdd);
  router.post('article', '/web/article/categoryEdit', checkLogin, controller.articleCategory.categoryEdit);
  // 文章
  router.post('article', '/web/article/list', checkLogin, controller.article.getArticleList);
  router.post('article', '/web/article/create', checkLogin, controller.article.articleCreate);
  router.post('article', '/web/article/edit', checkLogin, controller.article.articleEdit);
  router.post('article', '/web/article/detail', checkLogin, controller.article.articleDetail);
  router.post('article', '/web/article/del', checkLogin, controller.article.articleDel);


  // 文章，页面请求
  router.get('article', '/blog/article/list', controller.article.getArticleList);
  router.get('article', '/blog/article/allList', controller.article.getBolgArticleList);
  router.post('article', '/blog/article/detail', controller.article.articleDetail);
};
