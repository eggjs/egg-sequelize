'use strict';

const assert = require('assert');

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Post = app.model.db2.define('post', {
    user_id: INTEGER,
    name: STRING(30),
  });

  Post.associate = function() {
    assert.ok(app.model.db2.User);
    assert.ok(app.model.db2.Post);
    app.model.db2.Post.belongsTo(app.model.db2.User, { as: 'user', foreignKey: 'user_id' });
  };

  return Post;
};
