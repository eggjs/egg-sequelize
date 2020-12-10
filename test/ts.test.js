'use strict';

const coffee = require('coffee');
const path = require('path');
const mm = require('egg-mock');
const assert = require('assert');

describe('typescript', () => {
  it('should compile ts without error', () => {
    return coffee.fork(
      require.resolve('typescript/bin/tsc'),
      [ '-p', path.resolve(__dirname, './fixtures/apps/ts/tsconfig.json') ]
    )
      .debug()
      .expect('code', 0)
      .end();
  });
});


describe('typescript form 2', () => {

  let app;

  before(async () => {
    await coffee.fork(
      require.resolve('typescript/bin/tsc'),
      [ '-p', path.resolve(__dirname, './fixtures/apps/typescript/tsconfig.json') ]
    )
      .debug()
      .expect('code', 0)
      .end();

    app = mm.app({
      baseDir: 'apps/typescript',
    });

    return app.ready();
  });

  before(() => app.model.sync({ force: true }));

  after(mm.restore);

  it('should have models', async () => {
    const ctx = app.mockContext();
    assert.ok(ctx.model);
    assert.ok(ctx.model.User);
    assert.ok(ctx.model.Monkey);
    const res = await app.model.User.destroy({ truncate: true, force: true });
    assert.ok(typeof res === 'number');
    assert.ok(ctx.model !== app.model);
  });
});
