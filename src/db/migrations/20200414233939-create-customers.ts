import { QueryInterface, DataTypes, ModelAttributes } from 'sequelize';

import snakeCase from 'lodash/snakeCase';

import helpers from '../../lib/helpers';

const TABLE_NAME = snakeCase('Customers');
const INDEXES = ['name', 'email', snakeCase('receiverName'), snakeCase('receiverRfc')];
const FIELDS: ModelAttributes = helpers.snakeCaseObject({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  companyId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'companies',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiverName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiverRfc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiverFiscalResidence: {
    type: DataTypes.STRING,
  },
  receiverNumRegIdTrib: {
    type: DataTypes.STRING,
  },
  creditDays: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  creditLimit: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
  accessToken: {
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
