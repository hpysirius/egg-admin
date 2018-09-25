'use strict';

const Service = require('egg').Service;
const { pageSize, pageNumber } = require('../common/common');

class ArticleService extends Service {
  constructor(ctx) {
    super(ctx);
    this.ArticleCategoryModel = this.ctx.model.ArticleCategory;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  /**
   * @param {Object} 'article数据'
   * @return {Object} data
   */
  async getCategoryList({ ps = pageSize, pn = pageNumber, name = '' }) {
    const whereObj = {
      isDel: 0,
    };
    if (name) {
      Object.assign(whereObj, {
        name,
      });
    }
    const { count, rows } = await this.ArticleCategoryModel.findAndCount({
      attributes: [ 'id', 'name', 'pid', 'created_at', 'updated_at' ],
      where: whereObj,
      order: [[ 'id', 'DESC' ]],
      limit: Number(ps),
      offset: Number(pn - 1) * Number(ps),
    });
    return this.ServerResponse.createBySuccessData({
      pn,
      ps,
      list: rows,
      total: count,
    });
  }

  /**
   * @param {Object} category 'category数据'
   * @return {Object} data
   */
  async categoryAdd(category) {
    const { name, pid } = category;
    const data = await this.ArticleCategoryModel.create({ name, pid });
    return data;
  }

  /**
   * @param {Object} category 'category数据'
   * @return {Object} data
   */
  async categoryEdit(category) {
    const [ updateCount, [ updateRow ]] = await this.ArticleCategoryModel.update(category, {
      where: { id: category.id },
      individualHooks: true,
    });
    if (updateCount > 0) return this.ServerResponse.createBySuccessMsgAndData('更新成功', updateRow);
    return this.ServerResponse.createByError('更新失败');
  }
}

module.exports = ArticleService;
