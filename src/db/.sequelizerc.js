require('ts-node').register({});

const path = require('path')
const fs = require('fs')

const config = {
  config: path.join(__dirname, 'config', 'config.json'),
  'migrations-path': path.join(__dirname, 'migrations'),
  'models-path': path.join(__dirname, 'models'),
  'seeders-path': path.join(__dirname, 'seeds'),
};

const pathFile = path.join(__dirname, '../../node_modules/sequelize-cli/lib/core/migrator.js')
const file = fs.readFileSync(pathFile, 'utf8').replace('.js$/', '.(j|t)s$/')

fs.writeFileSync(pathFile, file, 'utf8')

module.exports = config;
