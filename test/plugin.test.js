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

  describe('Base', () => {
    it('sequelize init success', () => {
      const sequelize = app.sequelize;
      assert(sequelize);
    });

    it('ctx model property getter', () => {
      const ctx = app.mockContext();
      assert.ok(ctx.model);
      assert.ok(ctx.model.User);
      assert.ok(ctx.model.Monkey);
      assert.ok(ctx.model.Person);
    });

    it('has right tableName', () => {
      assert(app.model.Person.tableName === 'person');
      assert(app.model.User.tableName === 'user');
      assert(app.model.Monkey.tableName === 'monkey');
    });
  });

  describe('Test controller', () => {
    it('should get data from create', function* () {
      app.mockCsrf();

      yield request(app.callback())
      .post('/users')
      .send({
        name: 'popomore',
      });
      const user = yield app.model.User.findOne({ name: 'popomore' });
      assert.ok(user);
      assert(user.isNewRecord === false);
      const res = yield request(app.callback())
        .get('/users');
      assert(res.body[0].name === 'popomore');
    });
  });
});
