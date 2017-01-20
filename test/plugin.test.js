'use strict';

const mm = require('egg-mock');

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

  it('should load models into contxt', () => {
    //
  });
});

