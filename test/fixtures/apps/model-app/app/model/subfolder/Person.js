'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;
  const Person = app.model.define('person', {
    name: STRING(30),
  });

  return Person;
};
