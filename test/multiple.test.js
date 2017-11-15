'use strict';

const assert = require('assert');
const mm = require('egg-mock');
const request = require('supertest');

describe('test/multiple.test.js', () => {
  let app;

  before(() => {
    app = mm.app({
      baseDir: 'apps/multiple-db',
    });
    return app.ready();
  });
  before(() => Promise.all([
    app.model.db1.sync({ force: true }),
    app.model.db2.sync({ force: true }),
  ]));

  after(mm.restore);

  describe('Base', () => {
    it('sequelize init success', () => {
      assert(app.model);
    });

    it('ctx model property getter', () => {
      const ctx = app.mockContext();
      assert.ok(ctx.model.db1);
      assert.ok(ctx.model.db1.User);
      assert.ok(ctx.model.db1.Person);
      assert.ok(ctx.model.db2);
      assert.ok(ctx.model.db2.User);
      assert.ok(ctx.model.db2.Person);
    });

    it('has right tableName', () => {
      assert(app.model.db1.Person.tableName === 'people');
      assert(app.model.db1.User.tableName === 'users');
      assert(app.model.db2.Person.tableName === 'people');
      assert(app.model.db2.User.tableName === 'users');
    });
  });

  describe('Database options', () => {
    let config1;
    let config2;

    before(() => {
      config1 = app.model.db1.options;
      config2 = app.model.db2.options;
    });

    it('should work with default config', function* () {
      assert(config1.define.freezeTableName === false);
      assert(config1.port === '3306');
      assert(config1.username === 'root');
      assert(config1.password === '');
      assert(config1.logging !== false);
      assert(config1.benchmark === true);
      assert(config2.define.freezeTableName === false);
      assert(config2.port === '3306');
      assert(config2.username === 'root');
      assert(config2.password === '');
      assert(config2.logging !== false);
      assert(config2.benchmark === true);
    });

    it('should work with fixture configs', function* () {
      assert(config1.dialect === 'mysql');
      assert(config1.host === '127.0.0.1');
      assert(config1.pool.idle === 10000);
      assert(config1.timezone === '+08:01');
      assert(config1.storage === 'db/test-foo.sqlite');
      assert(config2.dialect === 'mysql');
      assert(config2.host === '127.0.0.1');
      assert(config2.pool.idle === 10000);
      assert(config2.timezone === '+08:01');
      assert(config2.storage === 'db/test-foo.sqlite');
    });
  });

  describe('Test model', () => {
    it('User.test method work', function* () {
      yield app.model.db1.User.test();
      yield app.model.db2.User.test();
    });

    it('should work timestramp', function* () {
      const user = yield app.model.db1.User.create({ name: 'huacnlee' });
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
      const user = yield app.model.db1.User.findOne({
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

  describe('Associate', () => {

    it('ctx model associate init success', () => {
      const ctx = app.mockContext();
      assert.ok(ctx.model);
      assert.ok(ctx.model.db1);
      assert.ok(ctx.model.db1.User);
      assert.ok(ctx.model.db1.User.prototype.hasPosts);
      assert.ok(ctx.model.db1.Post);

      assert.ok(ctx.model.db2);
      assert.ok(ctx.model.db2.User);
      assert.ok(ctx.model.db2.User.prototype.hasPosts);
      assert.ok(ctx.model.db2.Post);
    });

  });

});

