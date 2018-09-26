'use strict';

const Controller = require('egg').Controller;

class ArticleCategoryController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.ArticleCategoryService = ctx.service.articleCategoryService;
  }

  async categoryList() {
    const ctx = this.ctx;
    const response = await this.ArticleCategoryService.getCategoryList(ctx.request.body);
    ctx.body = response;
  }
  async getCategory() {
    const ctx = this.ctx;
    const response = await this.ArticleCategoryService.getCategory();
    ctx.body = response;
  }
  async categoryAdd() {
    const ctx = this.ctx;
    const response = await this.ArticleCategoryService.categoryAdd(ctx.request.body);
    ctx.body = response;
  }
  async categoryEdit() {
    const ctx = this.ctx;
    const response = await this.ArticleCategoryService.categoryEdit(ctx.request.body);
    ctx.body = response;
  }
}

module.exports = ArticleCategoryController;

