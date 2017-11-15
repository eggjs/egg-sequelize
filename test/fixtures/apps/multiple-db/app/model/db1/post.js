'use strict';

const assert = require('assert');

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Post = app.model.db1.define('post', {
    user_id: INTEGER,
    name: STRING(30),
  });

  Post.associate = function() {
    assert.ok(app.model.db1.User);
    assert.ok(app.model.db1.Post);
    app.model.db1.Post.belongsTo(app.model.db1.User, { as: 'user', foreignKey: 'user_id' });
  };

  return Post;
};
