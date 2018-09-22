'use strict';

const Service = require('egg').Service;
const { pageSize, pageNumber } = require('../common/common');

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.userModel = this.ctx.model.User;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }
  /**
   * @param {Object} 'user数据'
   * @return {Object} data
   */
  async getUserList({ ps = pageSize, pn = pageNumber }) {
    const { count, rows } = await this.userModel.findAndCount({
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
   * @param {Object} user 'user数据'
   * @return {Object} data
   */
  async create(user) {
    // 用户名存在报错
    const validUsernameResponse = await this.checkValid('username', user.username);
    if (!validUsernameResponse.isSuccess()) return validUsernameResponse;
    // 邮箱存在报错
    const validEmailResponse = await this.checkValid('email', user.email);
    if (!validEmailResponse.isSuccess()) return validEmailResponse;
    const { username, age, email, password } = user;
    const data = await this.userModel.create({ username, age, email, password });
    return data;
  }

  /**
   * @param {Object} user 'user数据'
   * @return {Object} data
   */
  async update(user) {
    const result = await this.userModel.findOne({
      attributes: [ 'username' ],
      where: {
        username: user.username,
        id: { $not: user.id },
      },
    });
    if (result) return this.ServerResponse.createByErrorMsg('用户名已存在, 请更换');
    const [ updateCount, [ updateRow ]] = await this.userModel.update(user, {
      where: { id: user.id },
      individualHooks: true,
    });
    if (updateCount > 0) return this.ServerResponse.createBySuccessMsgAndData('更新个人信息成功', updateRow);
    return this.ServerResponse.createByError('更新个人信息失败');
  }


  /**
   * @param {String} field {key}
   * @param {String} value {value}
   * @return {boolean} {Promise.<boolean>}
   */
  async _checkExistColByField(field, value) {
    const data = await this.userModel.findOne({
      attributes: [ field ],
      where: { [field]: value },
    });
    return !!data;
  }

  /**
   * @param {String} type 类型
   * @param {String} value 检查的值
   * @return {boolean} {Promise.<boolean>}
   */
  async checkValid(type, value) {
    if (type.trim()) {
      if (type === 'username') {
        return await this._checkExistColByField('username', value)
          ? this.ServerResponse.createByErrorMsg('用户名已存在')
          : this.ServerResponse.createBySuccessMsg('用户名不存在');
      }
      if (type === 'email') {
        return await this._checkExistColByField('email', value)
          ? this.ServerResponse.createByErrorMsg('邮箱已存在')
          : this.ServerResponse.createBySuccessMsg('邮箱不存在');
      }
    }
    return this.ServerResponse.createByErrorMsg('参数错误');
  }
}

module.exports = UserService;
