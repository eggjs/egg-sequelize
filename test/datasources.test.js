'use strict';

const assert = require('assert');
const mm = require('egg-mock');

describe('test/datasources.test.js', () => {
  let app;

  before(() => {
    app = mm.app({
      baseDir: 'apps/datasources',
    });
    return app.ready();
  });
  before(async () => {
    await app.model.sync({ force: true });
    await app.sequelize.sync({ force: true });
    await app.subproperty.a.sync({ force: true });
    await app.subproperty.b.sync({ force: true });
  });

  after(mm.restore);

  describe('Base', () => {
    it('sequelize init success', () => {
      assert(app.model);
      assert(app.sequelize);
      assert(app.Sequelize);
      assert(app.subproperty.a);
      assert(app.subproperty.b);
    });

    it('ctx model property getter', () => {
      const ctx = app.mockContext();
      assert(ctx.model);
      assert(ctx.model.User);
      assert(ctx.model.Monkey);
      assert(ctx.model.Person);
      assert(ctx.sequelize);
      assert(ctx.sequelize.User);
      assert(ctx.sequelize.Monkey);
      assert(!ctx.sequelize.Person); // ignored
      assert(ctx.model.User !== ctx.sequelize.User);
      assert(ctx.subproperty.a);
      assert(ctx.subproperty.a.User);
      assert(ctx.subproperty.a.Monkey);
      assert(ctx.subproperty.a.Person);
      assert(ctx.subproperty.b);
      assert(ctx.subproperty.b.User);
      assert(ctx.subproperty.b.Monkey);
      assert(ctx.subproperty.b.Person);
      assert(ctx.subproperty.a.User !== ctx.subproperty.b.User);
    });

    it('has right tableName', () => {
      assert(app.model.Person.tableName === 'people');
      assert(app.model.User.tableName === 'users');
      assert(app.model.Monkey.tableName === 'the_monkeys');
      assert(app.sequelize.User.tableName === 'users');
      assert(app.sequelize.Monkey.tableName === 'the_monkeys');
      assert(app.subproperty.a.Monkey.tableName === 'the_monkeys');
      assert(app.subproperty.b.Monkey.tableName === 'the_monkeys');
    });
  });

  describe('Test model', () => {
    it('User.test method work', async function() {
      await app.model.User.test();
    });

    it('should work timestramp', async function() {
      let user = await app.model.User.create({ name: 'huacnlee' });
      assert(user.isNewRecord === false);
      assert(user.name === 'huacnlee');
      assert(user.created_at !== null);
      assert(user.updated_at !== null);

      user = await app.sequelize.User.create({ name: 'huacnlee' });
      assert(user.isNewRecord === false);
      assert(user.name === 'huacnlee');
      assert(user.created_at !== null);
      assert(user.updated_at !== null);
    });
  });

  describe('Associate', () => {
    it('ctx model associate init success', () => {
      const ctx = app.mockContext();
      assert.ok(ctx.model);
      assert.ok(ctx.model.User);
      assert.ok(ctx.model.User.prototype.hasPosts);
      assert.ok(ctx.model.Post);

      assert.ok(ctx.sequelize);
      assert.ok(ctx.sequelize.User);
      assert.ok(ctx.sequelize.User.prototype.hasPosts);
      assert.ok(ctx.sequelize.Post);

      assert.ok(ctx.subproperty.a);
      assert.ok(ctx.subproperty.a.User);
      assert.ok(ctx.subproperty.a.User.prototype.hasPosts);
      assert.ok(ctx.subproperty.a.Post);

      assert.ok(ctx.subproperty.a);
      assert.ok(ctx.subproperty.a.User);
      assert.ok(ctx.subproperty.a.User.prototype.hasPosts);
      assert.ok(ctx.subproperty.a.Post);
    });
  });
});
