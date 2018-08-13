'use strict';

module.exports = {
  write: true,
  prefix: '^',
  test: [
    'test',
    'benchmark',
  ],
  dep: [
    "@types/sequelize",
  ],
  devdep: [
    'egg',
    'egg-bin',
    'autod',
    'eslint',
    'eslint-config-egg',
    'webstorm-disable-index',
  ],
  exclude: [
    './test/fixtures',
    './docs',
    './coverage',
  ],
  registry: 'https://r.cnpmjs.org',
};
