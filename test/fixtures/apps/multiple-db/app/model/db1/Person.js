'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;
  const Person = app.model.db1.define('person', {
    name: STRING(30),
  });

  return Person;
};
