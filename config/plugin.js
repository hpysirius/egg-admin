'use strict';

// had enabled by egg
// exports.static = true;


// config/plugin.js
exports.mysql = {
    enable: true,
    package: 'egg-mysql',
};
exports.cors = {
    enable: true,
    package: 'egg-cors',
};