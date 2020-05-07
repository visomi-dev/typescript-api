/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */

import {
  Association,
  Model,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
} from 'sequelize';

export class CompanyModel extends Model {
  public rfc!: string;

  public name!: string;

  public brand!: string | null;

  public zipCode!: string | null;

  public regime!: string | null;

  public curp!: string | null;

  public employerRegistration!: string | null;

  public ciec!: string | null;

  public efirmaPassword!: string | null;

  public csdPassword!: string | null;


  public id!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;


  public getUsers!: HasManyGetAssociationsMixin<UserModel>;

  public addUser!: HasManyAddAssociationMixin<UserModel, number>;

  public hasUser!: HasManyHasAssociationMixin<UserModel, number>;

  public countUsers!: HasManyCountAssociationsMixin;

  public createUser!: HasManyCreateAssociationMixin<UserModel>;

  public readonly Users?: UserModel[];

  public static associations: {
    Users: Association<CompanyModel, UserModel>;
  };
}

export class UserModel extends Model {
  public name!: string;

  public email!: string;

  public password!: string;

  public emailVerified!: boolean;

  public phoneNumber!: string;

  public referCode!: string;

  public referencedCode!: string | null;

  public defaultCompanyId!: number;


  public id!: number;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;


  public getUsers!: HasManyGetAssociationsMixin<CompanyModel>;

  public addCompany!: HasManyAddAssociationMixin<CompanyModel, number>;

  public hasCompany!: HasManyHasAssociationMixin<CompanyModel, number>;

  public countCompanies!: HasManyCountAssociationsMixin;

  public createCompany!: HasManyCreateAssociationMixin<CompanyModel>;

  public readonly Companies?: CompanyModel[];

  public static associations: {
    Companies: Association<UserModel, CompanyModel>;
  };
}
