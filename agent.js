'use strict';

module.exports = agent => {
  if (agent.config.sequelize.agent) require('./lib/loader')(agent);
};

