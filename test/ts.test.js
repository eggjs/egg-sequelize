'use strict';

const coffee = require('coffee');
const path = require('path');

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
