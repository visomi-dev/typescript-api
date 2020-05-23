/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from 'fs';

import { QueryInterface } from 'sequelize/types';
import snakeCase from 'lodash/snakeCase';
import csvReader from 'csv-reader';

import helpers from '../../lib/helpers';

const TABLE_NAME = snakeCase('ProductServiceKeys');
const CATALOG_PATH = require.resolve('../constants/catalogs/sat/productServiceKeys.csv');

async function getRows(): Promise<object[]> {
  const catalogStream = fs.createReadStream(CATALOG_PATH, 'utf8');

  const keys = {};

  const promise = new Promise<object[]>((resolve, reject) => {
    const reader = csvReader({ parseNumbers: false, trim: true, skipHeader: true });

    const mapData = ([value, label]): void => { keys[value] = label; };
    const mapRow = ([value, label]): any => helpers.snakeCaseObject({
      value,
      label,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const onResolve = (): void => { resolve(Object.entries(keys).map(mapRow)); };
    const onReject = (error: Error): void => { reject(error); };

    catalogStream
      .pipe(reader)
      .on('data', mapData)
      .on('end', onResolve)
      .on('error', onReject);
  });

  return promise;
}

const seeder = {
  async up(queryInterface: QueryInterface): Promise<void> {
    const rows = await getRows();

    return queryInterface.bulkInsert(TABLE_NAME, rows, {});
  },
  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};

export default seeder;
