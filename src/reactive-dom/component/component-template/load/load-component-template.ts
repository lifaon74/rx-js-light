import { IHTMLTemplate } from '../../../light-dom/template/template.type';
import { loadModuleHTMLTemplate } from './load-module-html-template';
import { loadAndCompileReactiveHTMLAsComponentTemplate } from './load-and-compile-reactive-html-as-component-template';
import { wrapHTMLTemplateForComponentTemplate } from '../misc/wrap-html-template-for-component-template';
import { DEFAULT_CONSTANTS_TO_IMPORT } from '../../../reactive-html/constants/default-constants-to-import.constant';


export function loadComponentTemplate<GData extends object>(
  path: string, // without extension
  constantsToImport: object = DEFAULT_CONSTANTS_TO_IMPORT,
  dataName?: string,
): Promise<IHTMLTemplate<GData>> {
  const controller = new AbortController();
  return fetch(`${ path }.js`, { signal: controller.signal })
    .then((response: Response) => {
      controller.abort();
      if (response.ok) {
        return loadModuleHTMLTemplate<object>(path)
          .then((template: IHTMLTemplate<object>) => {
            return wrapHTMLTemplateForComponentTemplate(
              template,
              constantsToImport,
              dataName,
            );
          });
      } else {
        return loadAndCompileReactiveHTMLAsComponentTemplate(
          `${ path }.html`,
          constantsToImport,
          dataName,
        );
      }
    });
}
