import { IComponentOptions } from './component-options.type';
import { HTMLElementConstructor } from '../custom-element/elements-list';
import { componentFactory } from './component-factory';


/**
 * DECORATOR (CLASS)
 */
export function Component<GData extends object>(
  options: IComponentOptions<GData>,
) {
  return <GClass extends HTMLElementConstructor>(
    target: GClass,
  ): GClass | void => {
    return componentFactory<GClass, GData>(target, options);
  };
}
