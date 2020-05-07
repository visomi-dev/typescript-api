import path from 'path';
import fs from 'fs';

import mailgunJs, { Attachment, messages } from 'mailgun-js';
import { MailgunSendData } from '../entities/requests';

import env from '../constants/env';

const mailgun = mailgunJs({
  apiKey: env.MAILGUN_API_KEY,
  domain: env.MAILGUN_DOMAIN,
});

const fileToAttach = (filePath: string): Attachment => new mailgun.Attachment({
  data: fs.readFileSync(filePath),
  filename: path.basename(filePath),
  knownLength: fs.statSync(filePath).size,
  contentType: path.extname(filePath),
});

function emailer(options: MailgunSendData): Promise<messages.SendResponse> {
  const { attachment: $attachment, ...$options }: MailgunSendData = options;

  const attachment = Array.isArray($attachment) ? $attachment : [$attachment];

  const mailOptions = {
    ...$options,
    attachment: attachment.map(fileToAttach),
  };

  return mailgun.messages().send(mailOptions);
}

export default emailer;
