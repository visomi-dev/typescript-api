import { CompanyModel, UserModel } from './models';

export interface BaseResponse {
  success: boolean;
  message: string;
}

export interface SessionResponse {
  token: string;
  user: UserModel;
  company: CompanyModel;
}

export interface SessionToken {
  user?: number;
  company?: number;
}

export class ErrorResponse extends Error {
  status: number;

  body: object;
}
