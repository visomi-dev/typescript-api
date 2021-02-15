/* eslint-disable max-classes-per-file */
// eslint-disable-next-line import/prefer-default-export

export class CompanyTable {
  rfc!: string;

  name!: string;

  brand!: string | null;

  zip_code!: string | null;

  regime!: string | null;

  curp!: string | null;

  employer_registration!: string | null;

  ciec!: string | null;

  efirma_password!: string | null;

  csd_password!: string | null;

  id!: number;

  created_at!: Date;

  updated_at!: Date;
}

export class UserTable {
  id!: number;

  name!: string;

  email!: string;

  password!: string;

  email_verified!: boolean;

  phone_number!: string;

  refer_code!: string;

  referenced_code!: string | null;

  default_company_id!: number;

  readonly created_at!: Date;

  readonly updated_at!: Date;
}

export class CompaniesUsersTable {
  id!: number;

  userId!: number;

  companyId!: number;

  createdAt!: Date;

  updatedAt!: Date;

  deletedAt!: Date;
}
