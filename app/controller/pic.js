'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');

class PicController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.PicService = ctx.service.picService;
    this.ServerResponse = ctx.response.ServerResponse;
  }
  async getPicList() {
    const ctx = this.ctx;
    const response = await this.PicService.getPicList(ctx.request.body);
    ctx.body = response;
  }
  async picCreate() {
    const ctx = this.ctx;
    const response = await this.PicService.picCreate(ctx.request.body);
    ctx.body = response;
  }
  async picEdit() {
    const ctx = this.ctx;
    const response = await this.PicService.picEdit(ctx.request.body);
    ctx.body = response;
  }
  async getDetail() {
    const ctx = this.ctx;
    const response = await this.PicService.getDetail(ctx.request.body);
    ctx.body = response;
  }
  async upload() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    // 创建可写流
    const writerStream = fs.createWriteStream(path.join(this.config.baseDir, `app/public/upload/${stream.filename}`));
    // 管道读写操作：接收流.管道写入('目标写入流')
    stream.pipe(writerStream);
    const response = this.ServerResponse.createBySuccessData({
      url: `/public/upload/${stream.filename}`,
    });
    ctx.body = response;
  }

}

module.exports = PicController;

