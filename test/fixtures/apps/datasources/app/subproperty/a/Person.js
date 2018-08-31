'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;
  const Person = app.subproperty.a.define('person', {
    name: STRING(30),
  });

  return Person;
};
