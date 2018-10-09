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
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [],
  };

  config.cors = {
    // origin: '*',
    origin: 'http://localhost:8000',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  return config;
};

