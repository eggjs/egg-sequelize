'use strict';
const path = require('path');
const fs = require('fs');

function requireConfig(name) {
  const filePath = path.resolve(`./config/config.${name}.js`);
  if (fs.existsSync(filePath)) {
    return require(filePath).model || {};
  }
  return {};
}

const defaultConfig = requireConfig('default');
const localConfig = requireConfig('local');
const unittestConfig = requireConfig('unittest');
const prodConfig = requireConfig('prod');

module.exports = {
  development: Object.assign(defaultConfig, localConfig),
  test: Object.assign(defaultConfig, unittestConfig),
  production: Object.assign(defaultConfig, prodConfig),
};

