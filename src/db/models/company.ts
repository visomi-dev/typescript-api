import { DataTypes } from 'sequelize';

import sequelize from '../sequelize';
import { CompanyModel } from '../../entities/models';

class Company extends CompanyModel {}

const companyFields = {
  rfc: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    index: true,
    unique: true,
    validate: {
      is: /^[A-Z&Ñ]{3,4}[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])[A-Z0-9]{2}[0-9A]$/,
    },
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    validate: {
      is: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
      min: 5,
      max: 120,
    },
  },
  brand: {
    type: new DataTypes.STRING(128),
    validate: {
      min: 5,
      max: 120,
    },
  },
  zipCode: {
    type: new DataTypes.STRING(128),
    validate: {
      is: /^[0-9]{5}$/,
    },
  },
  regime: {
    type: new DataTypes.STRING(128),
  },
  curp: {
    type: new DataTypes.STRING(128),
  },
  employerRegistration: {
    type: new DataTypes.STRING(128),
  },
  ciec: {
    type: new DataTypes.STRING(128),
  },
  efirmaPassword: {
    type: new DataTypes.STRING(128),
  },
  csdPassword: {
    type: new DataTypes.STRING(128),
  },
};

const companyOptions = {
  modelName: 'company',
  paranoid: true,
  underscored: true,
  sequelize,
};

Company.init(companyFields, companyOptions);

export default Company;
