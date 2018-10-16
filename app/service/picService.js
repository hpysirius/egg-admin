'use strict';

const Service = require('egg').Service;
const { pageSize, pageNumber } = require('../common/common');

module.exports = app => class PicService extends Service {
  constructor(ctx) {
    super(ctx);
    this.PicModel = this.ctx.model.Pic;
    this.ArticleCategoryModel = this.ctx.model.ArticleCategory;
    this.PicModel.belongsTo(this.ArticleCategoryModel, { foreignKey: 'category_id' });
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  /**
   * @param {Object} 'article数据'
   * @return {Object} data
   */
  async getPicList({ ps = pageSize, pn = pageNumber, title = '' }) {
    console.log(app.Sequelize.col('category_id'));
    const whereObj = {
      isDel: 0,
    };
    if (title) {
      Object.assign(whereObj, {
        title: {
          $like: `%${title}%`,
        },
      });
    }
    const { count, rows } = await this.PicModel.findAndCount({
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
  /**
   * @param {Object} params 'params数据'
   * @return {Object} data
   */
  async picCreate(params) {
    const data = await this.PicModel.create(params);
    return data && this.ServerResponse.createBySuccessMsg('新增成功');
  }
};
