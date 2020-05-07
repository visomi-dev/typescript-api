const { snakeCaseObject } = require('../helpers');
const bcrypt = require('../bcrypt');

const users = [{
  email: 'visomi.dev@gmail.com',
  name: 'Michael Villalba Sotelo',
  password: 'Temporal1',
  defaultCompanyId: 1,
  phoneNumber: '+(52)5587606759',
  createdAt: new Date(),
  updatedAt: new Date(),
}].map(snakeCaseObject);

module.exports = {
  async up(queryInterface) {
    const promises = users.map(async (user) => {
      const data = user;

      data.password = await bcrypt.hash(user.password);

      return data;
    });

    const result = await Promise.all(promises);

    return queryInterface.bulkInsert('users', result, {});
  },
  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
