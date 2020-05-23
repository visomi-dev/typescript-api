import { QueryInterface, DataTypes, ModelAttributes } from 'sequelize';

import snakeCase from 'lodash/snakeCase';

import helpers from '../../lib/helpers';

const TABLE_NAME = snakeCase('Companies');
const INDEXES = ['name'];
const FIELDS: ModelAttributes = helpers.snakeCaseObject({
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
