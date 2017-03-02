'use strict';

const assert = require('assert');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = app => {
  const config = Object.assign(app.config.sequelize, { logging });

  app.Sequelize = Sequelize;

  assert(config.database, 'config.database is required');
  assert(config.username, 'config.username is required');
  assert(config.host, 'config.host is required');
  assert(config.port, 'config.port is required');

  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      port: config.port,
      dialect: config.dialect,
      logging: config.logging,
      benchmark: true,
      define: {
        freezeTableName: false,
        underscored: true,
        timestamps: true,
      },
    }
  );

  // app.sequelize
  Object.defineProperty(app, 'model', {
    value: sequelize,
    writable: false,
    configurable: false,
  });

  loadModel(app);

  app.beforeStart(function* () {
    yield app.model.authenticate();
    app.logger.debug('[egg-sequelize] start success');
  });

  function logging(str) {
    app.coreLogger.info(`[egg-sequelize] ${str}`);
  }
};

function loadModel(app) {
  const modelDir = path.join(app.baseDir, 'app/model');
  app.loader.loadToApp(modelDir, '_models', {
    inject: app,
    caseStyle: 'upper',
    ignore: 'index.js',
  });

  for (const name of Object.keys(app._models)) {
    app.model[name] = app._models[name];
  }

  for (const name of Object.keys(app.model)) {
    const theModel = app.model[name];
    // only this Sequelize Model class
    if (!('getTableName' in theModel)) {
      continue;
    }

    if ('associate' in theModel) {
      theModel.associate();
    }
  }
}
