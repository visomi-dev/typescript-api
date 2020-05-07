import {
  readFile,
  writeFile,
  unlink,
  stat,
} from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);

const writeFileAsync = promisify(writeFile);

const unlinkAsync = promisify(unlink);

const statAsync = promisify(stat);

export default {
  readFileAsync,
  writeFileAsync,
  unlinkAsync,
  statAsync,
};
