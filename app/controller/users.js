'use strict';

const Controller = require('egg').Controller;
var svgCaptcha = require('svg-captcha');
const { cmd5 } = require('../../utils/index');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.UserService = ctx.service.userService;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  async list() {
    const ctx = this.ctx;
    const response = await this.UserService.getUserList(ctx.request.body);
    ctx.body = response;
  }

  async login() {
    const ctx = this.ctx;
    const login_code = ctx.session.login_code;
    let response = {};
    if(login_code !== `${ctx.request.body.captcha}`){
      response = this.ServerResponse.createByErrorMsg('验证码错误');
    }else{  
      response = await this.UserService.login(ctx.request.body);
      if (response.isSuccess()) {
        ctx.session.currentUser = response.getData();
        // 设置session过期时间
        ctx.session.maxAge = 1000 * 3600 * 10;
      }
    }
    ctx.body = response;
  }
   // 登出
  async logout() {
    this.ctx.session = null;
    this.ctx.body = this.ServerResponse.createBySuccess();
  }

  async create() {
    const ctx = this.ctx;
    const users = ctx.request.body;
    const password = cmd5(ctx.request.body.password);
    const respponse = await this.UserService.create({ ...users, password});
    ctx.body = respponse;
  }

  async update() {
    const ctx = this.ctx;
    const users = ctx.request.body;
    const response = await this.UserService.update({ ...users });
    ctx.body = response;
  }

  async del() {
    const ctx = this.ctx;
    const { id } = ctx.request.body;
    const response = await this.UserService.del(id);
    ctx.body = response;
  }

  async updatePassword() {
    const ctx = this.ctx;
    const response = await this.UserService.updatePassword(ctx.request.body);
    ctx.body = response;
  }
  async getCaptcha() {
    const ctx = this.ctx;
    const options = {// 参数
      width: 100,
      height: 32, // height of captcha
      fontSize: 50, // captcha text size
      color: true,
      noise: 2,
    }
    const Captcha = svgCaptcha.createMathExpr(options);// 生成验证码
    const { type, t } = ctx.query; // 接收客户端的数据，如果type为1则是登录页申请的验证码，type为2则是注册页申请的验证码
    ctx.session.login_code = Captcha.text; // 把验证码保存到session
    
    // 设置session过期时间
    ctx.session.maxAge = 1000 * 60 * 10;
    const response = this.ServerResponse.createBySuccessData(Captcha.data);;
    ctx.body = response
  }

}

module.exports = UserController;

