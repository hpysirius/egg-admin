'use strict';

const Controller = require('egg').Controller;
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
  }

  async list() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.User.findAll(query);
  }

  async login() {
    const ctx = this.ctx;
    const password = cmd5(ctx.request.body.password);
    console.log(password);
  }

  // async show() {
  //   const ctx = this.ctx;
  //   ctx.body = await ctx.model.User.findById(toInt(ctx.params.id));
  // }

  async create() {
    const ctx = this.ctx;
    const users = ctx.request.body;
    const password = cmd5(ctx.request.body.password);
    const respponse = await this.UserService.create({ ...users, password});
    ctx.body = respponse;
  }

  async update() {
    const ctx = this.ctx;
    const { id } = ctx.request.body;
    const user = await ctx.model.User.findById(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const users = ctx.request.body;
    const password = cmd5(ctx.request.body.password);
    await user.update({ ...users, password });
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const { id } = ctx.request.body;
    const user = await ctx.model.User.findById(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }
}

module.exports = UserController;

