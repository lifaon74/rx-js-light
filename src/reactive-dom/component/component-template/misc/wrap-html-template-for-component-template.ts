import { IHTMLTemplate } from '../../../light-dom/template/template.type';
import { DEFAULT_DATA_NAME } from '../../../reactive-html/constants/default-data-name.constant';

export function wrapHTMLTemplateForComponentTemplate<GData extends object, GTemplateArgument extends object = object>(
  template: IHTMLTemplate<GTemplateArgument>,
  constantsToImport: GTemplateArgument,
  dataName: string = DEFAULT_DATA_NAME,
): IHTMLTemplate<GData> {
  return (data: GData): DocumentFragment => {
    return template({
      ...constantsToImport,
      [dataName]: data,
    });
  };
}
