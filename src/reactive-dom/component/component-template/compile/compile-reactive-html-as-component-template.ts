import { DEFAULT_CONSTANTS_TO_IMPORT } from '../../../reactive-html/constants/default-constants-to-import.constant';
import { IHTMLTemplate } from '../../../light-dom/template/template.type';
import { compileHTMLAsEvaluatedHTMLTemplate } from '../../../reactive-html/compiler/to-js/compile-html-as-evaluated-html-template';
import { generateConstantsToImportForComponentTemplateFromObject } from '../misc/generate-constants-to-import-for-component-template-from-object';
import { wrapHTMLTemplateForComponentTemplate } from '../misc/wrap-html-template-for-component-template';


export function compileReactiveHTMLAsComponentTemplate<GData extends object>(
  html: string,
  constantsToImport: object = DEFAULT_CONSTANTS_TO_IMPORT,
  dataName?: string,
): IHTMLTemplate<GData> {
  const template: IHTMLTemplate<object> = compileHTMLAsEvaluatedHTMLTemplate<object>(
    html,
    generateConstantsToImportForComponentTemplateFromObject(constantsToImport),
  );

  return wrapHTMLTemplateForComponentTemplate(
    template,
    constantsToImport,
    dataName,
  );
}
