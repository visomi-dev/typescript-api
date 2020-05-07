import path from 'path';
import fs from 'fs';

import set from 'lodash/set';
import KoaRouter from 'koa-router';

import files from '../lib/files';

const ROOT = path.dirname(path.dirname(__dirname));
const DOC_PATH = path.join(ROOT, 'docs/api.html');

const router = new KoaRouter({ prefix: '/documentation' });

router.get('/', async (ctx, next) => {
  const fileStat = await files.statAsync(DOC_PATH);
  const docIsFile = fileStat.isFile();

  if (docIsFile) {
    set(ctx, 'type', path.extname(DOC_PATH));
    set(ctx, 'body', fs.createReadStream(DOC_PATH));
  }

  return next();
});

export default router;
