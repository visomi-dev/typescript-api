import { Context, Next } from 'koa';

import validateSession from '../usecases/authentication/validateSession';

async function authMiddleware(ctx: Context, next: Next): Promise<unknown> {
  ctx.state.session = await validateSession(ctx);

  return next();
}


export default authMiddleware;
