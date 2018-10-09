'use strict';

const Service = require('egg').Service;
const { pageSize, pageNumber } = require('../common/common');
const { cmd5 } = require('../../utils/index');

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.userModel = this.ctx.model.User;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  /**
   * @param {Object} '登陆用户名和密码'
   * @return {Object} data
   */
  async login(user){
    const result = await this.userModel.findOne({
      attributes: [ 'id', 'username', 'email' ],
      where: { 
        isDel: 0, 
        username: user.username, 
        password: cmd5(user.password) 
      },
    });
    if(!result) return this.ServerResponse.createByErrorMsg('用户名或者密码错误');
    return this.ServerResponse.createBySuccessData(result);
  }

  /**
   * @param {Object} 'user数据'
   * @return {Object} data
   */
  async getUserList({ ps = pageSize, pn = pageNumber, username = '' }) {
    const whereObj = {
      isDel: 0
    };
    if(username){
      Object.assign(whereObj, {
        username
      })
    }
    const { count, rows } = await this.userModel.findAndCount({
      attributes: [ 'id', 'username', 'email', 'age', 'created_at', 'updated_at' ],
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
   * @param {Object} user 'user数据'
   * @return {Object} data
   */
  async create(user) {
    const validUsername = await this._checkExistColByField('username', user.username);
    if(validUsername) {
      return this.ServerResponse.createByErrorMsg('用户名已存在, 请更换');
    }
    const validEmail = await this._checkExistColByField('email', user.email);
    if(validEmail) {
      return this.ServerResponse.createByErrorMsg('邮箱已经存在，请更换');
    }
    const { username, age = null, email, password } = user;
    const data = await this.userModel.create({ username, age, email, password });
    return data;
  }

  /**
   * @param {Object} user 'user数据'
   * @return {Object} data
   */
  async update(user) {
    const validUsername = await this._checkExistColByField('username', user.username,
     { id: { $not: user.id } });
    if(validUsername) {
      return this.ServerResponse.createByErrorMsg('用户名已存在, 请更换');
    }
    const validEmail = await this._checkExistColByField('email', user.email,
     { id: { $not: user.id } });
    if(validEmail) {
      return this.ServerResponse.createByErrorMsg('邮箱已经存在，请更换');
    }
    const [ updateCount, [ updateRow ]] = await this.userModel.update(user, {
      where: { id: user.id },
      individualHooks: true,
    });
    if (updateCount > 0) return this.ServerResponse.createBySuccessMsgAndData('更新个人信息成功', updateRow);
    return this.ServerResponse.createByError('更新个人信息失败');
  }

  /**
   * @param {Object} user 'user数据'
   * @return {Object} data
   */
  async updatePassword(user) {
    const result = await this.userModel.findOne({
      attributes: [ 'id' ],
      where: { id: user.id, password: cmd5(user.passwordOld) },
    });

    if (!result) return this.ServerResponse.createByErrorMsg('旧密码错误');
    const [ rowCount ] = await this.userModel.update({
      password: cmd5(user.passwordNew),
    }, {
      where: {
        id: user.id,
      },
    });
    if (rowCount > 0) return this.ServerResponse.createBySuccessMsg('修改密码成功');
    return this.ServerResponse.createByErrorMsg('更新密码失败');
  }

  /**
   * 删除用户
   * @param {Number} id '需要删除的id'
   * @return {Object} 返回的data
   */
  async del(id) {
    const result = await this.userModel.findOne({
      attributes: [ 'id' ],
      where: { id },
    });
    if (!result) return this.ServerResponse.createByErrorMsg('找不到该用户');
    const [ rowCount ] = await this.userModel.update({
      isDel: 1,
    }, {
      where: {
        id,
      },
    });
    if (rowCount > 0) return this.ServerResponse.createBySuccessMsg('删除用户成功');
    return this.ServerResponse.createByErrorMsg('删除用户失败');
  }
  /**
   * @param {String} field {key}
   * @param {String} value {value}
   * @return {boolean} {Promise.<boolean>}
   */
  async _checkExistColByField(field, value, extra = {}) {
    const data = await this.userModel.findOne({
      attributes: [ field ],
      where: { 
        ...extra,
        [field]: value,
        isDel: 0
      },
    });
    return !!data;
  }
}

module.exports = UserService;
