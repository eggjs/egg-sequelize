'use strict';

const assert = require('assert');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  return app.model.define('user', {
    name: STRING(30),
    age: INTEGER,
  }, {
    classMethods: {
      associate() {
        assert.ok(app.model.User);
      },

      * test() {
        assert(app.config);
        assert(app.model.User === this);
        const monkey = yield app.model.Monkey.create({ name: 'The Monkey' });
        assert(monkey.id);
        assert(monkey.isNewRecord === false);
        assert(monkey.name === 'The Monkey');
      },
    },
  });
};
