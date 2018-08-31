'use strict';

const assert = require('assert');

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Post = app.subproperty.a.define('post', {
    user_id: INTEGER,
    name: STRING(30),
  });

  Post.associate = function() {
    assert.ok(app.subproperty.a.User);
    assert.ok(app.subproperty.a.Post);
    app.subproperty.a.Post.belongsTo(app.subproperty.a.User, { as: 'user', foreignKey: 'user_id' });
  };

  return Post;
};
