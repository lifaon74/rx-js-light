import { IObjectProperties } from '../to-lines/helpers/generate-object-properties-lines';
import { IHTMLTemplate } from '../../../light-dom/template/template.type';
import { convertHTMLTemplateLinesToEvaluatedHTMLTemplate } from './convert-html-template-lines-to-evaluated-html-template';
import { compileHTMLAsHTMLTemplate } from '../to-lines/html/compile-html-as-html-template';


export function compileHTMLAsEvaluatedHTMLTemplate<GTemplateArgument extends object>(
  html: string,
  constantsToImport?: IObjectProperties,
): IHTMLTemplate<GTemplateArgument> {
  return convertHTMLTemplateLinesToEvaluatedHTMLTemplate(compileHTMLAsHTMLTemplate(html, constantsToImport));
}
