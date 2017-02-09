'use strict';

const mm = require('egg-mock');
require('should');

describe('test/plugin.test.js', () => {
  let app;

  before(done => {
    app = mm.app({
      baseDir: 'apps/model-app',
      plugin: 'sequelize',
    });
    app.ready(done);
  });

  after(mm.restore);

  it('test config', function() {
    const config = app.config.sequelize;
    config.should.have.properties([
      'modelPath',
      'port',
      'host',
      'username',
      'password',
      'database',
      'dialect',
      'logging',
    ]);
  });

  it('sequelize init success', function() {
    const sequelize = app.sequelize;
    sequelize.should.be.ok;
    sequelize.should.have.propertyByPath('models', 'test');
  });


});

