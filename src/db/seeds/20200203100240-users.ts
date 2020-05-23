import { QueryInterface } from 'sequelize';

import snakeCase from 'lodash/snakeCase';

import helpers from '../../lib/helpers';
import bcrypt from '../../lib/bcrypt';

const TABLE_NAME = snakeCase('Users');
const DATA = [{
  email: 'visomi.dev@gmail.com',
  name: 'Michael Villalba Sotelo',
  password: 'Temporal1',
  defaultCompanyId: 1,
  phoneNumber: '+(52)5587606759',
  createdAt: new Date(),
  updatedAt: new Date(),
}].map(helpers.snakeCaseObject);

const seeder = {
  async up(queryInterface: QueryInterface): Promise<void> {
    const promises = DATA.map(async (user) => {
      const data = user;

      data.password = await bcrypt.hash(user.password);

      return data;
    });

    const result = await Promise.all(promises);

    await queryInterface.bulkInsert(TABLE_NAME, result, {});
  },
  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};

export default seeder;
