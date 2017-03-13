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
  before(() => app.model.sync({ force: true }));

  after(mm.restore);

  describe('Base', () => {
    it('sequelize init success', () => {
      assert(app.model);
    });

    it('ctx model property getter', () => {
      const ctx = app.mockContext();
      assert.ok(ctx.model);
      assert.ok(ctx.model.User);
      assert.ok(ctx.model.Monkey);
      assert.ok(ctx.model.Person);
    });

    it('has right tableName', () => {
      assert(app.model.Person.tableName === 'people');
      assert(app.model.User.tableName === 'users');
      assert(app.model.Monkey.tableName === 'the_monkeys');
    });
  });

  describe('Test model', () => {
    it('User.test method work', function* () {
      yield app.model.User.test();
    });

    it('should work timestramp', function* () {
      const user = yield app.model.User.create({ name: 'huacnlee' });
      assert(user.isNewRecord === false);
      assert(user.name === 'huacnlee');
      assert(user.created_at !== null);
      assert(user.updated_at !== null);
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
      const user = yield app.model.User.findOne({
        where: { name: 'popomore' },
      });
      assert.ok(user);
      assert(user.name === 'popomore');
      assert(user.isNewRecord === false);
      const res = yield request(app.callback())
        .get(`/users/${user.id}`);
      assert(res.status === 200);
      assert(res.body.name === 'popomore');
    });
  });
});
