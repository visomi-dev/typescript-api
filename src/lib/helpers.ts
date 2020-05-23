import merge from 'lodash/merge';
import snakeCase from 'lodash/snakeCase';

const isArray = (array): boolean => Array.isArray(array);
const isObject = (value): boolean => typeof value === 'object' && !isArray(value);


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function snakeCaseObject(obj: any): any {
  if (!isObject(obj)) return obj;

  return Object.keys(obj).reduce(
    (accum, key) => merge(accum, { [snakeCase(key)]: obj[key] }),
    {},
  );
}

export default {
  snakeCaseObject,
};
