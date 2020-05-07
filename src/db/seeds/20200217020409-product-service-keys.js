const fs = require('fs');

const snakeCase = require('lodash/snakeCase');
const csvReader = require('csv-reader');

const { snakeCaseObject } = require('../helpers');

const TABLE_NAME = snakeCase('ProductServiceKeys');
const CATALOG_PATH = require.resolve('../constants/catalogs/sat/productServiceKeys.csv');

async function getRows() {
  const catalogStream = fs.createReadStream(CATALOG_PATH, 'utf8');

  const keys = {};

  const promise = new Promise((resolve, reject) => {
    const reader = csvReader({ parseNumbers: false, trim: true, skipHeader: true });

    const mapData = ([value, label]) => { keys[value] = label; };
    const mapRow = ([value, label]) => snakeCaseObject({
      value,
      label,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const onResolve = () => { resolve(Object.entries(keys).map(mapRow)); };
    const onReject = (error) => { reject(error); };

    catalogStream
      .pipe(reader)
      .on('data', mapData)
      .on('end', onResolve)
      .on('error', onReject);
  });

  return promise;
}

const seed = {
  async up(queryInterface) {
    const rows = await getRows();

    return queryInterface.bulkInsert(TABLE_NAME, rows, {});
  },
  down: queryInterface => queryInterface.bulkDelete(TABLE_NAME, null, {}),
};

module.exports = seed;
