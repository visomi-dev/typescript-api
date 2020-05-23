import Koa from 'koa';
import koaBody from 'koa-body';
import koaCors from '@koa/cors';

import env from './constants/env';

import router from './router';

import logger from './lib/logger';

import errorHandlerMiddleware from './middlewares/errorHandler';
import loggerMiddleware from './middlewares/logger';

const PORT = env.PORT || 8000;
const MAX_FILE_SIZE = 10000000;

async function server(): Promise<void> {
  const app = new Koa();

  app.use(errorHandlerMiddleware);
  app.use(loggerMiddleware);
  app.use(koaCors());
  app.use(koaBody({ multipart: true, formidable: { maxFileSize: MAX_FILE_SIZE } }));

  app.use(router.routes()).use(router.allowedMethods());

  app.listen(PORT, () => {
    logger.info(`server up & running... listening on ${PORT}`);
  });
}

export default server;
