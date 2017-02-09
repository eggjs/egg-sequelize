'use strict';

module.exports = sequelize => {
  return sequelize.define('test', {
    name: {
      type: sequelize.Sequelize.STRING(30),
    }
  })
};
