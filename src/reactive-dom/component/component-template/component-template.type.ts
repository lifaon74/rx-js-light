import { IHTMLTemplate } from '../../light-dom/template/template.type';


export type IComponentTemplate<GData extends object> =
  IHTMLTemplate<GData>
  | Promise<IHTMLTemplate<GData>>
  ;



