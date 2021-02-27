import { ICustomElementOptions } from '../custom-element/custom-element-functions';
import { IComponentTemplate } from '../component-template/component-template.type';
import { IComponentStyle } from '../component-style/component-style.type';

export interface IComponentOptions<GData extends object> extends ICustomElementOptions {
  template?: IComponentTemplate<GData>;
  style?: IComponentStyle;
  // host?: IHostBinding<any>[];
}
