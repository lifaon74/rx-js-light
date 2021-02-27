import { IHTMLTemplate } from '../../../light-dom/template/template.type';


export function loadModuleHTMLTemplate<GTemplateArgument extends object>(
  path: string,
): Promise<IHTMLTemplate<GTemplateArgument>> {
  return import(path);
}
