import fs from 'fs';
import path from 'path';

import kebabCase from 'lodash/kebabCase';
import mjml from 'mjml';
import handlebars from 'handlebars';

const ASSETS_PATH = path.join(path.dirname(__dirname), 'assets');

function makeTemplate(templateName: string): HandlebarsTemplateDelegate {
  const templatePath = path.join(ASSETS_PATH, `${kebabCase(templateName)}.mjml`);

  const content = fs.readFileSync(templatePath).toString();

  const asset = mjml(content, { minify: true });

  const template = handlebars.compile(asset.html);

  return template;
}

const templates = {
  verifyEmail: makeTemplate('verifyEmail'),
  signUp: makeTemplate('signUp'),
  setPassword: makeTemplate('setPassword'),
  resetPassword: makeTemplate('resetPassword'),
};

export default templates;
