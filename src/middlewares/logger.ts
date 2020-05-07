import { Context, Next } from 'koa';
import colors from 'colors';

import logger from '../lib/logger';

function filterBody(body): string {
  const newBody = typeof body === 'string' ? JSON.parse(body) : body;
  const bodyToClean = { ...newBody };

  if (bodyToClean.password) bodyToClean.password = '<password>';
  if (bodyToClean.token) bodyToClean.token = '<token>';

  return JSON.stringify(bodyToClean);
}

function logRequestData(ctx: Context): string {
  const data = [
    `headers: ${JSON.stringify(ctx.request.headers)}`,
  ];

  if (Object.keys(ctx.query).length > 0) {
    data.push(`query: ${JSON.stringify(ctx.query)}`);
  }

  if (!['GET', 'DELETE'].includes(ctx.method)) {
    data.push(`body: ${filterBody(ctx.request.body)}`);
  }

  return data.join(', ');
}

const logMessageIn = (ctx: Context): string => (
  `${ctx.method} ${colors.blue('✦')} ${ctx.url} - ${colors.blue('request')}: ${logRequestData(ctx)}`
);

function logMessageOut(ctx: Context, duration: number, isError = false): string {
  const message = [ctx.method];

  if (isError) message.push(colors.red('✖️'));
  else message.push(colors.green('✔️'));

  message.push(ctx.url, '->');

  if (isError) message.push(colors.red(ctx.status.toString()));
  else message.push(colors.green(ctx.status.toString()));

  message.push('-', duration.toString(), 'ms,');

  if (isError) message.push(colors.red('response:'));
  else message.push(colors.green('response:'));

  message.push(filterBody(ctx.body));

  return message.join(' ');
}

async function loggerMiddleware(ctx: Context, next: Next): Promise<void> {
  const start = Date.now();

  try {
    await next();

    const ms = Date.now() - start;

    logger.info(logMessageIn(ctx));
    logger.info(logMessageOut(ctx, ms));
  } catch (error) {
    const ms = Date.now() - start;

    logger.error(logMessageOut(ctx, ms, true));
    logger.error(`${colors.red('[ERROR]')} in (${ctx.path}) -> status: ${ctx.status} -> message: ${error.message || '🤷‍♀️'}`);
    logger.error(error);

    throw error;
  }
}

export default loggerMiddleware;
