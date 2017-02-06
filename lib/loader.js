'use strict';

const loading = require('loading');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = app => {
  app.config.sequelize.logging = function(str) {
    app.logger.info(`[egg-sequelize] ${str}`);
  };
  const config = app.config.sequelize;

  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: config.port,
      dialect: config.dialect,
    }
  );

  app.sequelize = sequelize;

  app.beforeStart(function* () {
    yield app.sequelize.authenticate();
    loading(`${path.join(app.baseDir, 'app', config.modelPath)}`).into(sequelize, 'models');

    Object.keys(sequelize.models).forEach(className => {
      if ('associate' in sequelize.models[className]) {
        sequelize.models[className].associate(sequelize.models);
      }
    });
    app.context.models = sequelize.models;
  });
};
