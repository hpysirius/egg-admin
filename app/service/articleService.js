'use strict';

const Service = require('egg').Service;
const { pageSize, pageNumber } = require('../common/common');

module.exports = app => class ArticleService extends Service {
  constructor(ctx) {
    super(ctx);
    this.ArticleModel = this.ctx.model.Article;
    this.ArticleCategoryModel = this.ctx.model.ArticleCategory;
    this.ArticleModel.belongsTo(this.ArticleCategoryModel, { foreignKey: 'category_id' });
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  /**
   * @param {Object} 'article数据'
   * @return {Object} data
   */
  async getArticleList({ ps = pageSize, pn = pageNumber, name = '' }) {
    console.log(app.Sequelize.col('category_id'));
    const whereObj = {
      isDel: 0,
    };
    if (name) {
      Object.assign(whereObj, {
        name,
      });
    }
    const { count, rows } = await this.ArticleModel.findAndCount({
      attributes: [ 'id', 'title', 'author', 'category_id', 'created_at', 'updated_at' ],
      where: whereObj,
      order: [[ 'id', 'DESC' ]],
      limit: Number(ps),
      offset: Number(pn - 1) * Number(ps),
      include: {
        model: this.ArticleCategoryModel,
        attributes: [ 'name' ],
        where: {
          id: app.Sequelize.col('category_id'),
        },
      },
    });
    return this.ServerResponse.createBySuccessData({
      pn,
      ps,
      list: rows,
      total: count,
    });
  }
  /**
   * @param {Object} article 'article数据'
   * @return {Object} data
   */
  async articleCreate(article) {
    const data = await this.ArticleModel.create(article);
    return data && this.ServerResponse.createBySuccessMsg('新增成功');
  }
  /**
   * @param {Object} article 'article数据'
   * @return {Object} data
   */
  async articleEdit(article) {
    const data = await this.ArticleModel.update(article, {
      where: {
        id: article.id,
      },
    });
    return data && this.ServerResponse.createBySuccessMsg('更新成功');
  }
  /**
   * @param {Object} article 'article数据'
   * @return {Object} data
   */
  async articleDetail(article) {
    const result = await this.ArticleModel.findOne({
      where: {
        isDel: 0,
        id: article.id,
      },
    });
    return result && this.ServerResponse.createBySuccessData(result);
  }
};
