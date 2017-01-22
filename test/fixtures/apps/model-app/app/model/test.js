'use strict';

module.exports = function (sequelize) {
  return sequelize.define('test', {
    name: {
      type: sequelize.Sequelize.STRING(30),
    }
  })
};
