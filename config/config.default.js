'use strict';

module.exports = appInfo => {
  // const config = exports = {};
  const config = {
    sequelize: {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      user: 'root',
      // 密码
      // password: 'huanghui0330',
      password: 'huanghui0330',
      database: 'ant_admin',
    }
      // mysql: {
      //   // 单数据库信息配置
      //   client: {
      //     // host
      //     host: 'localhost',
      //     // 端口号
      //     port: '3306',
      //     // 用户名
      //     user: 'root',
      //     // 密码
      //     // password: 'huanghui0330',
      //     password: 'huanghui0330',
      //     // 数据库名
      //     database: 'ant_admin',
      //   },
      //   // 是否加载到 app 上，默认开启
      //   app: true,
      //   // 是否加载到 agent 上，默认关闭
      //   agent: false,
      // }
    };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1537199351611_7126';

  // add your config here
  config.middleware = [];
  
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*']
  };
  
  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  return config;
};
