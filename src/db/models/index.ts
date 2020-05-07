import snakeCase from 'lodash/snakeCase';

import Company from './company';
import User from './user';

Company.belongsToMany(User, {
  through: snakeCase('CompaniesUsers'),
});

User.belongsToMany(Company, {
  through: snakeCase('CompaniesUsers'),
});

export default {
  Company,
  User,
};
