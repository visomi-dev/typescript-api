import Ajv from 'ajv';
import { Context, Next, Middleware } from 'koa';
import { get } from 'lodash';

interface Options {
  type?: string;
  defsSchemas: Array<object>;
}

const defaultOptions = (): Options => ({ type: 'body', defsSchemas: [] });

function validator(mainSchema: object, options?: Options): Middleware {
  const $options = options || defaultOptions();

  const { type = 'body', defsSchemas = [] } = $options;

  const ajv = new Ajv({ allErrors: true });

  defsSchemas.forEach((schema: object) => { ajv.addSchema(schema); });

  const validate = ajv.compile(mainSchema);

  return (ctx: Context, next: Next): Promise<unknown> => {
    const data = get(ctx.request, type, {});

    const valid = validate(data);

    if (!valid) {
      const errors = validate.errors.reduce((accum, error) => [
        ...accum,
        error.message,
      ], []).join(', ');

      return ctx.throw(400, errors);
    }

    return next();
  };
}

export default validator;
