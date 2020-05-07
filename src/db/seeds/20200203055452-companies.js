const companies = [{
  rfc: 'LAN7008173R5',
  name: 'typescript-api SA de CV FullStack',
  created_at: new Date(),
  updated_at: new Date(),
}];

module.exports = {
  up: queryInterface => queryInterface.bulkInsert(
    'companies',
    companies,
    {},
  ),
  down: queryInterface => queryInterface.bulkDelete('companies', null, {}),
};
