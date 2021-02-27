import { DEFAULT_CONSTANTS_TO_IMPORT } from '../../constants/default-constants-to-import.constant';
import { ITerserMinifyResult, minify } from '../misc/minify';
import { linesToString } from '../to-lines/helpers/lines-formating-helpers';
import { compileHTMLAsHTMLTemplateModule } from '../to-lines/html/compile-html-as-html-template-module';
import { generateConstantsToImportForComponentTemplateFromObject } from '../../../component/component-template/misc/generate-constants-to-import-for-component-template-from-object';

/**
 * DEBUG FUNCTIONS ONLY
 * WARN EXPERIMENTAL
 */

export const DEFAULT_MINIFY_OPTIONS = {
  module: true,
  compress: { pure_getters: true, passes: 2 },
  mangle: {
    module: true,
    toplevel: true,
  },
  output: {},
  parse: {},
  rename: {},
};


export function compileReactiveHTMLAsModule(
  html: string,
  constantsToImport: object = DEFAULT_CONSTANTS_TO_IMPORT,
): Promise<string> {
  return minify(linesToString(compileHTMLAsHTMLTemplateModule(html, generateConstantsToImportForComponentTemplateFromObject(constantsToImport))), DEFAULT_MINIFY_OPTIONS)
    .then((result: ITerserMinifyResult) => {
      return result.code;
    });
}

export function compileReactiveHTMLAsModuleWithStats(
  html: string,
  constantsToImport: object = DEFAULT_CONSTANTS_TO_IMPORT,
): Promise<string> {
  console.time('compilation');
  const code: string = linesToString(compileHTMLAsHTMLTemplateModule(html, generateConstantsToImportForComponentTemplateFromObject(constantsToImport)));
  console.timeEnd('compilation');
  console.time('minification');
  const percent = (value: number): string => `${ Math.floor(value * 100) }%`;
  return minify(code, DEFAULT_MINIFY_OPTIONS)
    .then((result: ITerserMinifyResult) => {
      console.timeEnd('minification');
      return result.code;
    })
    .then((minified: string) => {
      console.log(`- html: ${ html.length }`);
      console.log(`- compiled: ${ code.length } (html: ${ percent(code.length / html.length) })`);
      console.log(`- minified: ${ minified.length } (html: ${ percent(minified.length / html.length) }, compiled: ${ percent(minified.length / code.length) })`);

      return minified;
    });
}
