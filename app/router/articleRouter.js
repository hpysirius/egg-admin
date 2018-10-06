'use strict';

module.exports = app => {
  const { router, controller } = app;
  // 文章分类
  router.post('article', '/web/article/getCategory', controller.articleCategory.getCategory);
  router.post('article', '/web/article/category', controller.articleCategory.categoryList);
  router.post('article', '/web/article/categoryAdd', controller.articleCategory.categoryAdd);
  router.post('article', '/web/article/categoryEdit', controller.articleCategory.categoryEdit);
  // 文章
  router.post('article', '/web/article/list', controller.article.getArticleList);
  router.post('article', '/web/article/create', controller.article.articleCreate);
  router.post('article', '/web/article/edit', controller.article.articleEdit);
  router.post('article', '/web/article/detail', controller.article.articleDetail);


  // 文章，页面请求
  router.get('article', '/blog/article/list', controller.article.getArticleList);
  router.post('article', '/blog/article/detail', controller.article.articleDetail);
};
