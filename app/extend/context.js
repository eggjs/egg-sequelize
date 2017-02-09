'use strict';
module.exports = {
  get model() {
    return this.app.sequelize.models;
  },
};
