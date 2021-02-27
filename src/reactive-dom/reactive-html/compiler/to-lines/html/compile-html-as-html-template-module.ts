import { ILines } from '../compiler.types';
import { IObjectProperties } from '../helpers/generate-object-properties-lines';
import { compileHTMLAsHTMLTemplate } from './compile-html-as-html-template';


export function compileHTMLAsHTMLTemplateModule(
  html: string,
  constantsToImport?: IObjectProperties,
): ILines {
  return [
    `"use strict";`,
    `export default (`,
    ...compileHTMLAsHTMLTemplate(
      html,
      constantsToImport,
    ),
    `);`,
  ];
}
