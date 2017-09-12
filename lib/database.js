'use strict';
const path = require('path');
const fs = require('fs');

function mockAppInfo() {
  const appPkg = require(path.resolve('./package.json'));
  const info = {
    baseDir: path.resolve('./'),
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

const defaultConfig = requireConfig('default');
const localConfig = requireConfig('local');
const unittestConfig = requireConfig('unittest');
const prodConfig = requireConfig('prod');

module.exports = {
  development: Object.assign({}, defaultConfig, localConfig),
  test: Object.assign({}, defaultConfig, unittestConfig),
  production: Object.assign({}, defaultConfig, prodConfig),
};

