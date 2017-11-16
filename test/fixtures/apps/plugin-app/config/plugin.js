'use strict';

const path = require('path');

exports.model = {
  enable: true,
  path: path.join(__dirname, '../../../plugins/model-plugin'),
};

console.log(exports.model.path);
