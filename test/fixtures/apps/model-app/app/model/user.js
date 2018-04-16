'use strict';

const assert = require('assert');

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const User = app.model.define('user', {
    name: STRING(30),
    age: INTEGER,
    space_id: {
      type: INTEGER,
      allowNull: true,
    },
  });

  User.associate = function() {
    assert.ok(app.model.User);
    assert.ok(app.model.Post);
    app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
  };

  User.test = function* () {
    assert(app.config);
    assert(app.model.User === this);
    const monkey = yield app.model.Monkey.create({ name: 'The Monkey' });
    assert(monkey.id);
    assert(monkey.isNewRecord === false);
    assert(monkey.name === 'The Monkey');
  };

  User.addHook('beforeCreate', instance => {
    if (instance.ctx && instance.ctx.space_id) {
      console.log('auto set space_id to %s on User beforeCreate hook', instance.ctx.space_id);
      instance.space_id = instance.ctx.space_id;
    }
  });

  return User;
};
