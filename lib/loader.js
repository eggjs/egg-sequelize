'use strict';

const loading = require('loading');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = (app, done) => {
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

  sequelize.authenticate().then(() => {
    sequelize.Sequelize = Sequelize;

    loading(`${path.join(app.baseDir, 'app', config.modelPath)}`).into(sequelize, 'models');

    Object.keys(sequelize.models).forEach(className => {
      if ('associate' in sequelize.models[className]) {
        sequelize.models[className].associate(sequelize.models);
      }
    });

    app.sequelize = sequelize;
    app.context.models = sequelize.models;

    done();
  }).catch(done);
};
