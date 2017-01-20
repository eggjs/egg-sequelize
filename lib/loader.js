'use strict';

const loading = require('loading');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = (app, done) => {
  app.config.sequelize.logging = function(str) {
    app.logger.info(`[egg-sequelize] ${str}`);
  };

  const sequelize = new Sequelize(
    `mysql://${app.config.sequelize.username}:${app.config.sequelize.password}@${app.config.sequelize.host}:${app.config.sequelize.port || 3306}/${app.config.sequelize.database}`,
    app.config.sequelize);

  sequelize.authenticate().then(() => {
    sequelize.Sequelize = Sequelize;

    loading(`${path.join(app.baseDir, 'app', app.config.sequelize.modelPath)}`).into(sequelize, 'models');

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
