'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.ArticleService = ctx.service.articleService;
  }
  async getArticleList() {
    const ctx = this.ctx;
    const response = await this.ArticleService.getArticleList(ctx.request.body);
    ctx.body = response;
  }
  async getBlogAllArticleList() {
    const ctx = this.ctx;
    const response = await this.ArticleService.getAllArticle(ctx.request.body);
    ctx.body = response;
  }
  async articleCreate() {
    const ctx = this.ctx;
    const response = await this.ArticleService.articleCreate(ctx.request.body);
    ctx.body = response;
  }
  async articleEdit() {
    const ctx = this.ctx;
    const response = await this.ArticleService.articleEdit(ctx.request.body);
    ctx.body = response;
  }
  async articleDetail() {
    const ctx = this.ctx;
    const response = await this.ArticleService.articleDetail(ctx.request.body);
    ctx.body = response;
  }
  async articleDel() {
    const ctx = this.ctx;
    const { id } = ctx.request.body;
    const response = await this.ArticleService.del(id);
    ctx.body = response;
  }

}

module.exports = ArticleController;

