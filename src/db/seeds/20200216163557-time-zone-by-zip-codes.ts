/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from 'fs';

import { QueryInterface } from 'sequelize/types';
import snakeCase from 'lodash/snakeCase';
import csvReader from 'csv-reader';

import helpers from '../../lib/helpers';

const TABLE_NAME = snakeCase('TimeZoneByZipCodes');
const CATALOG_PATH = require.resolve('../constants/catalogs/sat/timeZoneByZipCodes.csv');
const MAPPER = {
  'Tiempo del Centro': 'America/Mexico_City',
  'Tiempo del Noroeste': 'America/Hermosillo',
  'Tiempo del Pacífico': 'America/Mazatlan',
  'Tiempo del Pacífico Sonora': 'America/Hermosillo',
  'Tiempo del Centro en Frontera': 'America/Matamoros',
  'Tiempo del Noroeste en Frontera': 'America/Tijuana',
  'Tiempo del Pacífico en Frontera': 'America/Mazatlan',
  'Tiempo del Sureste': 'America/Cancun',
};

async function getRows(): Promise<object[]> {
  const catalogStream = fs.createReadStream(CATALOG_PATH, 'utf8');

  const timeZones = {};

  const promise = new Promise<object[]>((resolve, reject) => {
    const reader = csvReader({ parseNumbers: false, trim: true, skipHeader: true });

    const mapData = ([zipCode, timeZone]): void => { timeZones[zipCode] = MAPPER[timeZone]; };
    const mapRow = ([zipCode, timeZone]): any => helpers.snakeCaseObject({
      zipCode,
      timeZone,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const onResolve = (): any => { resolve(Object.entries(timeZones).map(mapRow)); };
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

    await queryInterface.bulkInsert(TABLE_NAME, rows, {});
  },
  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete(TABLE_NAME, null, {});
  },
};

export default seeder;
