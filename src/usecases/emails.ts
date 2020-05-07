import emailer from '../lib/emailer';

import { MailgunSendData, EmailLog } from '../entities/requests';

import EmailModel from '../db/models/email';

interface SendOptions {
  template: HandlebarsTemplateDelegate;
  data: {
    to: string | string[];
    from: string;
  };
  subject: string;
}

async function send(options: SendOptions): Promise<EmailLog> {
  const {
    template,
    data,
    subject,
  } = options;

  const html = template(data);

  const { to, from } = data;

  const emailOptions: MailgunSendData = {
    to,
    from,
    subject,
    html,
  };

  try {
    const response = await emailer(emailOptions);
    emailOptions.response = response;
  } catch ({ message }) {
    emailOptions.response = { id: null, message };
  }

  const emailLog = new EmailModel(emailOptions);

  const payload = await emailLog.save();

  return payload;
}

const usecases = {
  send,
};

export default usecases;
