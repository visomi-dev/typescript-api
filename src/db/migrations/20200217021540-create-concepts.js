const snakeCase = require('lodash/snakeCase');

const { snakeCaseObject } = require('../helpers');

const TABLE_NAME = snakeCase('Concepts');
const INDEXES = [snakeCase('identificationNumber'), 'description'];
const fields = DataTypes => snakeCaseObject({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
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
  identificationNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  unit: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  productServiceKey: {
    type: DataTypes.STRING,
  },
  unitKey: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
});

const migration = {
  up: async (queryInterface, DataTypes) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(TABLE_NAME, fields(DataTypes), { transaction });
      await queryInterface.addIndex(TABLE_NAME, INDEXES, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  },
  down: queryInterface => queryInterface.dropTable(TABLE_NAME),
};

module.exports = migration;
