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
      attributes: [ 'id', 'title', 'author', 'keywords', 'category_id', 'created_at', 'updated_at' ],
      where: whereObj,
      order: [[ 'updated_at', 'DESC' ]],
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
  async getAllArticle() {
    const data = await this.ArticleModel.findAll({
      attributes: [ 'id', 'title', 'author', 'category_id', 'created_at', 'updated_at' ],
      where: {
        isDel: 0,
      },
      order: [[ 'updated_at', 'DESC' ]],
    });
    return data;
  }

  /**
   * 删除用户
   * @param {Number} id '需要删除的id'
   * @return {Object} 返回的data
   */
  async del(id) {
    const result = await this.ArticleModel.findOne({
      attributes: [ 'id' ],
      where: { id },
    });
    if (!result) return this.ServerResponse.createByErrorMsg('找不到该文章');
    const [ rowCount ] = await this.ArticleModel.update({
      isDel: 1,
    }, {
      where: {
        id,
      },
    });
    if (rowCount > 0) return this.ServerResponse.createBySuccessMsg('删除文章成功');
    return this.ServerResponse.createByErrorMsg('删除文章失败');
  }

  /**
   * @param {Object} '按月查询文章数据'
   * @return {Object} data
   */
  async getBolgArticleList({ ps = pageSize, pn = pageNumber, name = '' }) {
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
      // where: app.Sequelize.literal('isDel = 0'),
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
