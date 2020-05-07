const path = require('path')

const config = {
  config: path.join(__dirname, 'config', 'config.json'),
  'migrations-path': path.join(__dirname, 'migrations'),
  'models-path': path.join(__dirname, 'models'),
  'seeders-path': path.join(__dirname, 'seeds'),
};

module.exports = config;
