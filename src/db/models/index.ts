import snakeCase from 'lodash/snakeCase';

import Company from './company';
import User from './user';
import Email from './email';

Company.belongsToMany(User, {
  through: snakeCase('CompaniesUsers'),
});

User.belongsToMany(Company, {
  through: snakeCase('CompaniesUsers'),
});

export default {
  Company,
  User,
  Email,
};
