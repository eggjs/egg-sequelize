'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;
  return app.model.define('person', {
    name: STRING(30),
  });
};
