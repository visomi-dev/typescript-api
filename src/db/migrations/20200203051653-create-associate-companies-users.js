const snakeCase = require('lodash/snakeCase');

const { snakeCaseObject } = require('../helpers');

const TABLE_NAME = snakeCase('CompaniesUsers');
const fields = DataTypes => snakeCaseObject({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  companyId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'companies',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
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
