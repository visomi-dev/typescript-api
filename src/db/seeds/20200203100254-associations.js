const snakeCase = require('lodash/snakeCase');

const ASSOCIATIONS = [{
  user_id: 1,
  company_id: 1,
  created_at: new Date(),
  updated_at: new Date(),
}];

const TABLE_NAME = snakeCase('CompaniesUsers');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    TABLE_NAME,
    ASSOCIATIONS,
    {},
  ),
  down: queryInterface => queryInterface.bulkDelete(TABLE_NAME, null, {}),
};
