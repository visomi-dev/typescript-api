import { QueryInterface } from 'sequelize';

import snakeCase from 'lodash/snakeCase';

import helpers from '../../lib/helpers';

const TABLE_NAME = snakeCase('Companies');
const DATA = [{
  rfc: 'VISM950520298',
  name: 'Michael Villalba Sotelo',
  createdAt: new Date(),
  updatedAt: new Date(),
}].map(helpers.snakeCaseObject);

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
