'use strict';

module.exports = appInfo => {
  const config = exports = {};
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1537199351611_7126';
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    user: 'root',
    // 密码
    // password: 'huanghui0330',
    password: 'admin',
    database: 'ant_admin',
  };
  // config.redis = {
  //   client: {
  //     port: 6379, // Redis port
  //     host: '127.0.0.1', // Redis host
  //     password: 'foobared',
  //     db: 0,
  //   },
  //   agent: true,
  // };
  // config.sessionRedis = {
  //   key: 'EGG_SESSION',
  //   maxAge: 24 * 3600 * 1000,
  //   httpOnly: true,
  //   encrypt: false,
  // };

  // config.session = {
  //   key: 'EGG_SESS',
  //   maxAge: 24 * 3600 * 1000, // 1 天
  //   httpOnly: true,
  //   encrypt: true,
  // };
  // add your config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ],
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  return config;
};

