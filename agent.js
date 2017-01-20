'use strict';

const loader = require('./lib/loader');

module.exports = appOrAgent => {
  const done = appOrAgent.readyCallback('agent_sequelize');
  loader(appOrAgent, done);
};
