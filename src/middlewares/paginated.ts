import { Context, Next } from 'koa';
import { set } from 'lodash';

const TEN_BASE = 10;

function paginated(ctx: Context, next: Next): Promise<unknown> {
  const { size, page } = ctx.query;

  set(ctx, 'query.size', parseInt(size, TEN_BASE));
  set(ctx, 'query.page', parseInt(page, TEN_BASE));

  return next();
}

export default paginated;
