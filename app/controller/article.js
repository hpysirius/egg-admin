'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.ArticleService = ctx.service.articleService;
  }

  async categoryList() {
    const ctx = this.ctx;
    const response = await this.ArticleService.getCategoryList(ctx.request.body);
    ctx.body = response;
  }
  async categoryAdd() {
    const ctx = this.ctx;
    const response = await this.ArticleService.categoryAdd(ctx.request.body);
    ctx.body = response;
  }
  async categoryEdit() {
    const ctx = this.ctx;
    const response = await this.ArticleService.categoryEdit(ctx.request.body);
    ctx.body = response;
  }
}

module.exports = ArticleController;

