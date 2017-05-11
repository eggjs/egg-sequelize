'use strict';
const path = require('path');
const fs = require('fs');

function requireConfig(name) {
  const configPath = path.resolve(`./config/config.${name}.js`);
  if (!fs.existsSync(configPath)) { return {}; }

  let config = require(configPath);
  // FIXME: config init with function need send appInfo argument.
  if ((typeof config) === 'function') { config = config({}); }
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

