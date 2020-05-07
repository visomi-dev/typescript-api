import mongoose, { Schema } from 'mongoose';

import { EmailLog } from '../../entities/requests';

const schema = {
  to: String,
  from: String,
  subject: String,
  html: {
    type: String,
    default: undefined,
  },
  text: {
    type: String,
    default: undefined,
  },
  attachment: {
    type: String,
    default: undefined,
  },
  response: {
    type: new Schema({
      id: {
        type: String,
        default: undefined,
      },
      message: String,
    }, { timestamps: true }),
    default: undefined,
  },
};

const modelSchema = new mongoose.Schema(schema, { timestamps: true });

const Email = mongoose.model<EmailLog>('Email', modelSchema);

export default Email;
