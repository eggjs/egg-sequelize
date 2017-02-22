'use strict';

module.exports = model => {
  const { Sequelize: { STRING } } = model;
  return model.define('person', {
    name: STRING(30),
  });
};
