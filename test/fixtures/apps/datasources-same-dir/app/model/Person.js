'use strict';

module.exports = (app, model) => {
  const { STRING } = app.Sequelize;
  const Person = model.define('person', {
    name: STRING(30),
  });

  return Person;
};
