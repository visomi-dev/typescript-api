import { DataTypes } from 'sequelize';

import sequelize from '../sequelize';
import { EmailModel } from '../../entities/models';

class Email extends EmailModel {}

const emailFields = {
  to: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  from: {
    type: new DataTypes.STRING(128),
  },
  subject: {
    type: new DataTypes.STRING(128),
  },
  html: {
    type: new DataTypes.TEXT('long'),
  },
  text: {
    type: new DataTypes.TEXT('long'),
  },
  mailgunResponseId: {
    type: new DataTypes.STRING(128),
  },
  mailgunResponseMessage: {
    type: new DataTypes.STRING(128),
  },
};

const emailOptions = {
  modelName: 'email',
  paranoid: true,
  underscored: true,
  sequelize,
};

Email.init(emailFields, emailOptions);

export default Email;
