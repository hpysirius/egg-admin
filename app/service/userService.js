'use strict';

const Service = require('egg').Service;
// const _ = require('lodash');

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.userModel = this.ctx.model.User;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
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
