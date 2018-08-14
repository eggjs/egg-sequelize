'use strict';

const assert = require('assert');
const mm = require('egg-mock');

describe('test/plugin.test.js', () => {
  let app;

  before(() => {
    app = mm.app({
      baseDir: 'apps/sub-model',
    });
    return app.ready();
  });
  before(() => app.model.sync({ force: true }));

  after(mm.restore);

  describe('Base', () => {
    it('sequelize init success', () => {
      assert.ok(app.model);
      assert.ok(app.model.User);
      assert.ok(app.model.Sub.Post);
    });

    it('ctx model property getter', () => {
      const ctx = app.mockContext();
      assert.ok(ctx.model);
      assert.ok(ctx.model.User);
      assert.ok(ctx.model.Sub.Post);
    });
  });

  describe('Associate', () => {
    it('ctx model associate init success', () => {
      const ctx = app.mockContext();
      assert.ok(ctx.model);
      assert.ok(ctx.model.User);
      assert.ok(ctx.model.User.prototype.hasPosts);
      assert.ok(ctx.model.Sub.Post);
      console.log(ctx.model.Sub.Post);
      assert.ok(ctx.model.Sub.Post.prototype.getUser);
    });
  });
});
