import { Context, Next } from 'koa';

async function errorHandler(ctx: Context, next: Next): Promise<void> {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;

    ctx.body = {
      success: false,
      message: error.message,
      ...error.body,
    };

    ctx.app.emit('error', error, ctx);
  }
}

export default errorHandler;
