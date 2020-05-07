import mongoose from 'mongoose';
import { messages } from 'mailgun-js';

import { UserModel } from './models';

export interface SignUpUser {
  name: string;
  email: string;
  password: string;
  emailVerified: boolean;
  phoneNumber: string;
  referCode?: string;
  referencedCode?: string;
}

export interface SignUpCompany {
  rfc: string;
  name: string;
  brand?: string;
  zipCode?: string;
  regime?: string;
  curp?: string;
  employerRegistration?: string;
  efirmaPassword?: string;
  csdPassword?: string;
}

export interface SignUpBody {
  user: SignUpUser;
  company: SignUpCompany;
}

export interface SendSignUpEmailBody {
  hasPassword: boolean;
  user: UserModel;
}

export interface MailgunSendData extends messages.SendData {
  attachment?: string | string[];
  response?: messages.SendResponse;
}

export interface EmailLog extends mongoose.Document {
  to: string;
  from: string;
  subject: string;
  html?: string | undefined;
  text?: string | undefined;
  attachment?: string | undefined;
  response: {
    id?: string | undefined;
    message?: string | undefined;
  };
}
