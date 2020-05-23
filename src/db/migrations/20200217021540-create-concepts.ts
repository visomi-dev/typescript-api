import { QueryInterface, DataTypes, ModelAttributes } from 'sequelize';

import snakeCase from 'lodash/snakeCase';

import helpers from '../../lib/helpers';

const TABLE_NAME = snakeCase('Concepts');
const INDEXES = [snakeCase('identificationNumber'), 'description'];
const FIELDS: ModelAttributes = helpers.snakeCaseObject({
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
  async up(queryInterface: QueryInterface): Promise<void> {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(TABLE_NAME, FIELDS, { transaction });
      await queryInterface.addIndex(TABLE_NAME, INDEXES, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();

      throw error;
    }
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable(TABLE_NAME);
  },
};

export default migration;
