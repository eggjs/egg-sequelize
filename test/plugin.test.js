'use strict';

const assert = require('assert');
const mm = require('egg-mock');
const request = require('supertest');

describe('test/plugin.test.js', () => {
  let app;

  before(() => {
    app = mm.app({
      baseDir: 'apps/model-app',
    });
    return app.ready();
  });
  before(() => app.sequelize.sync({ force: true }));

  after(mm.restore);

  it('sequelize init success', function() {
    const sequelize = app.sequelize;
    assert(sequelize);
    assert(sequelize.models);
    assert.deepEqual(sequelize.models, app.model);
    assert(sequelize.models.user);
  });

  it('ctx model property getter', function() {
    const ctx = app.mockContext();
    assert.ok(ctx.model);
    assert.ok(ctx.model.user);
    assert.ok(ctx.model.monkey);
  });

  it('should get data from create', function* () {
    app.mockCsrf();

    yield request(app.callback())
    .post('/users')
    .send({
      name: 'popomore',
    });
    const res = yield request(app.callback())
      .get('/users');
    assert(res.body[0].name === 'popomore');
  });
});
