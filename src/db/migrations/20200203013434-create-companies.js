const snakeCase = require('lodash/snakeCase');

const { snakeCaseObject } = require('../helpers');

const TABLE_NAME = snakeCase('Companies');
const fields = DataTypes => snakeCaseObject({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  rfc: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  brand: {
    type: DataTypes.STRING,
  },
  zipCode: {
    type: DataTypes.STRING,
  },
  regime: {
    type: DataTypes.STRING,
  },
  curp: {
    type: DataTypes.STRING,
  },
  employerRegistration: {
    type: DataTypes.STRING,
  },
  ciec: {
    type: DataTypes.STRING,
  },
  efirmaPassword: {
    type: DataTypes.STRING,
  },
  csdPassword: {
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
});

const migration = {
  up: (queryInterface, DataTypes) => queryInterface.createTable(TABLE_NAME, fields(DataTypes)),
  down: queryInterface => queryInterface.dropTable(TABLE_NAME),
};

module.exports = migration;
