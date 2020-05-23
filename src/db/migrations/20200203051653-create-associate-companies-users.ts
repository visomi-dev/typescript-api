import { QueryInterface, DataTypes, ModelAttributes } from 'sequelize';

import snakeCase from 'lodash/snakeCase';

import helpers from '../../lib/helpers';

const TABLE_NAME = snakeCase('CompaniesUsers');
const FIELDS: ModelAttributes = helpers.snakeCaseObject({
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
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.createTable(TABLE_NAME, FIELDS);
  },
  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable(TABLE_NAME);
  },
};

export default migration;
