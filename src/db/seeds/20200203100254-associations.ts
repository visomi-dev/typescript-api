import { QueryInterface } from 'sequelize';

import snakeCase from 'lodash/snakeCase';

import { CompaniesUsersTable } from '../../entities/db';
import helpers from '../../lib/helpers';

const TABLE_NAME = snakeCase('CompaniesUsers');
const DATA = [{
  userId: 1,
  companyId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
}].map(((association) => helpers.snakeCaseObject<CompaniesUsersTable>(association)));

const seeder = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      DATA,
      {},
    );
  },
  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};

export default seeder;
