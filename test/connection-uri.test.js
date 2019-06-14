'use strict';

const coffee = require('coffee');
const path = require('path');
const mm = require('egg-mock');
const assert = require('assert');

describe('connection-uri', () => {
  let app;

  before(() => {
    console.log('compiling...');
    return coffee
      .fork(require.resolve('typescript/bin/tsc'), [
        '-p',
        path.resolve(__dirname, './fixtures/apps/connection-uri/tsconfig.json'),
      ])
      .debug()
      .expect('code', 0)
      .end();
  });


  before(() => {
    app = mm.app({
      baseDir: 'apps/connection-uri',
    });
    return app.ready();
  });
  before(() => app.model.sync({ force: true }));

  after(mm.restore);

  describe('Base', () => {
    it('sequelize init success', () => {
      assert.ok(app.model);
      assert.ok(app.model.User);
    });
  });
});
