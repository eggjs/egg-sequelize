'use strict';
const path = require('path');
const fs = require('fs');

function mockAppInfo() {
  const appPkg = require(path.join(process.cwd(), 'package.json'));
  const info = {
    baseDir: process.cwd(),
    HOME: process.env.HOME,
    pkg: appPkg,
    name: appPkg.name,
  };

  return info;
}

function requireConfig(name) {
  const configPath = path.resolve(`./config/config.${name}.js`);
  if (!fs.existsSync(configPath)) { return {}; }

  let config = require(configPath);
  if ((typeof config) === 'function') { config = config(mockAppInfo()); }
  return config.sequelize || {};
}
// EGG_SERVER_ENV=prepub npm run migrate:up
// When EGG_SERVER_ENV is not local or unittest, set it production by default.
const serverEnv = process.env.EGG_SERVER_ENV || 'local';

const defaultConfig = requireConfig('default');
const localConfig = requireConfig(serverEnv);
const unittestConfig = requireConfig('unittest');
const prodConfig = requireConfig('prod');

module.exports = {
  development: Object.assign({}, defaultConfig, localConfig),
  test: Object.assign({}, defaultConfig, unittestConfig),
  production: Object.assign({}, defaultConfig, prodConfig),
};
