'use strict';

module.exports = app => {
  const { STRING } = app.Sequelize;
  const Person = app.sequelize.define('person', {
    name: STRING(30),
  });

  return Person;
};
