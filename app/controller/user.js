'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async select() {
      const ctx = this.ctx;
      const user = await ctx.service.user.select();
      ctx.body = user;
    }
}
module.exports = UserController;
  