'use strict';

import { Application } from 'egg';
import assert = require('assert');

export default function(app: Application) {
  const { STRING, INTEGER } = app.Sequelize;
  const User = app.model.define('user', {
    name: STRING(30),
    age: INTEGER,
  });

  return class extends User {
    static async associate() {
      assert.ok(app.model.User);
    }

    static async test() {
      assert(app.config);
      assert(app.model.User === this);
      const monkey = await app.model.Monkey.create({ name: 'The Monkey' });
      assert(monkey.isNewRecord === false);
    }
  }
}
