#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const child_process = require('child_process');

const eggSequelizeRoot = __dirname;
let sequelizeRoot = path.resolve(eggSequelizeRoot, './node_modules/sequelize-cli');

if (!fs.existsSync(sequelizeRoot)) {
  sequelizeRoot = './node_modules/sequelize-cli';
}

const sequelizeBin = path.resolve(sequelizeRoot, './bin/sequelize');
const args = [
  sequelizeBin,
  '--optionsPath',
  path.resolve(eggSequelizeRoot, '../lib/sequelizerc.js'),
].concat(process.argv.slice(2));

child_process.spawn(process.argv[0], args, { stdio: 'inherit' });
