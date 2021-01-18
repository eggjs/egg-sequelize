'use strict';

const assert = require('assert');
const mm = require('egg-mock');

describe('test/base-dir.test.js', () => {
  let app;

  before(() => {
    app = mm.app({
      baseDir: 'apps/base-dir',
    });
    return app.ready();
  });
  before(() => app.model.sync({ force: true }));

  after(mm.restore);

  describe('Base', () => {
    it('sequelize init success', () => {
      assert.ok(app.model);
      assert.ok(app.model.User);
      assert.ok(app.model.Post);
    });

    it('ctx model property getter', () => {
      const ctx = app.mockContext();
      assert.ok(ctx.model);
      assert.ok(ctx.model.User);
      assert.ok(ctx.model.Post);
    });
  });

  describe('Associate', () => {
    it('ctx model associate init success', () => {
      const ctx = app.mockContext();
      assert.ok(ctx.model);
      assert.ok(ctx.model.User);
      assert.ok(ctx.model.User.prototype.hasPosts);
      assert.ok(ctx.model.Post);
      console.log(ctx.model.Post);
      assert.ok(ctx.model.Post.prototype.getUser);
    });
  });
});
