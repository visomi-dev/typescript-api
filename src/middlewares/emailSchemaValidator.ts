import schemaValidator from './schemaValidator';

import emailSchema from '../constants/json-schemas/email.json';

const emailSchemaValidator = schemaValidator(emailSchema);

export default emailSchemaValidator;
