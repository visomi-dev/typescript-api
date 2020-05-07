import path from 'path';
import raml2html from 'raml2html';

import files from './lib/files';

async function documentation(): Promise<void> {
  const root = path.dirname(__dirname);

  const DOC_PATH = path.join(root, 'docs');
  const RAML_PATH = path.join(DOC_PATH, 'api.raml');
  const HTML_PATH = path.join(DOC_PATH, 'api.html');

  const CONFIG_WHIT_DEFAULT_THEME = raml2html.getConfigForTheme('raml2html-slate-theme');

  const result = await raml2html.render(RAML_PATH, CONFIG_WHIT_DEFAULT_THEME);

  await files.writeFileAsync(HTML_PATH, result);
}

export default documentation;
