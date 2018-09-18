const Service = require('egg').Service;

class UserService extends Service {
    async select(uid) {
        // 假如 我们拿到用户 id 从数据库获取用户详细信息
        const user = await this.app.mysql.query('select * from users');
        return { user };
    }
}

module.exports = UserService;


