import merge from 'lodash/merge';
import snakeCase from 'lodash/snakeCase';

const snakeCaseObject = <T>(obj: { [key: string]: any }): T => (
  Object.keys(obj).reduce(
    (accumulator, key) => merge(accumulator, { [snakeCase(key)]: obj[key] }),
    {},
  ) as T
);

export default {
  snakeCaseObject,
};
