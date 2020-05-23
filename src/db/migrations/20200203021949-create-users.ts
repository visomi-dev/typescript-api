import { QueryInterface, DataTypes, ModelAttributes } from 'sequelize';

import snakeCase from 'lodash/snakeCase';

import helpers from '../../lib/helpers';

const TABLE_NAME = snakeCase('Users');
const INDEXES = ['name', snakeCase('phoneNumber')];
const FIELDS: ModelAttributes = helpers.snakeCaseObject({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  referCode: {
    type: DataTypes.STRING,
  },
  referencedCode: {
    type: DataTypes.STRING,
  },
  defaultCompanyId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'companies',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
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
