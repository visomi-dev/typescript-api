import { DataTypes } from 'sequelize';

import sequelize from '../sequelize';
import { UserModel } from '../../entities/models';

class User extends UserModel {}

const userFields = {
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    validate: {
      is: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
      min: 8,
      max: 120,
    },
  },
  email: {
    type: new DataTypes.STRING(128),
    index: true,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    validate: {
      is: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,50}/,
      min: 8,
      max: 50,
    },
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  phoneNumber: {
    type: new DataTypes.STRING(128),
    validate: {
      is: /([+][(][0-9]{1,4}[)])([0-9]{5,})/,
      min: 5,
    },
  },
  referCode: {
    type: new DataTypes.STRING(128),
  },
  referencedCode: {
    type: new DataTypes.STRING(128),
  },
  defaultCompanyId: {
    type: new DataTypes.INTEGER(),
  },
};

const userOptions = {
  modelName: 'user',
  paranoid: true,
  underscored: true,
  sequelize,
};

User.init(userFields, userOptions);

export default User;
