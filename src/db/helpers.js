const merge = require('lodash/merge');
const snakeCase = require('lodash/snakeCase');

const isArray = array => Array.isArray(array);
const isObject = value => typeof value === 'object' && !isArray(value);

function snakeCaseObject(obj) {
  if (!isObject(obj)) return obj;

  return Object.keys(obj).reduce(
    (accum, key) => merge(accum, { [snakeCase(key)]: obj[key] }),
    {},
  );
}

module.exports.snakeCaseObject = snakeCaseObject;
