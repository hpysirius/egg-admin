'use strict';

const md5 = require('md5');

const password_salt = '_hpysirius_';
// 密码加密
const cmd5 = val => {
  const passowrd_val = val + password_salt;
  return md5(passowrd_val);
};

module.exports = {
  cmd5,
};
