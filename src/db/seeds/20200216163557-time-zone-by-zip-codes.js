const fs = require('fs');

const snakeCase = require('lodash/snakeCase');
const csvReader = require('csv-reader');

const { snakeCaseObject } = require('../helpers');

const TABLE_NAME = snakeCase('TimeZoneByZipCodes');
const CATALOG_PATH = require.resolve('../constants/catalogs/sat/timeZoneByZipCodes.csv');

const mapper = {
  'Tiempo del Centro': 'America/Mexico_City',
  'Tiempo del Noroeste': 'America/Hermosillo',
  'Tiempo del Pacífico': 'America/Mazatlan',
  'Tiempo del Pacífico Sonora': 'America/Hermosillo',
  'Tiempo del Centro en Frontera': 'America/Matamoros',
  'Tiempo del Noroeste en Frontera': 'America/Tijuana',
  'Tiempo del Pacífico en Frontera': 'America/Mazatlan',
  'Tiempo del Sureste': 'America/Cancun',
};

async function getRows() {
  const catalogStream = fs.createReadStream(CATALOG_PATH, 'utf8');

  const timeZones = {};

  const promise = new Promise((resolve, reject) => {
    const reader = csvReader({ parseNumbers: false, trim: true, skipHeader: true });

    const mapData = ([zipCode, timeZone]) => { timeZones[zipCode] = mapper[timeZone]; };
    const mapRow = ([zipCode, timeZone]) => snakeCaseObject({
      zipCode,
      timeZone,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const onResolve = () => { resolve(Object.entries(timeZones).map(mapRow)); };
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
