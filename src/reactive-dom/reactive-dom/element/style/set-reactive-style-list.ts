import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { extractStylesFromAny, IExtractStylesFromAny } from './extract-styles';
import { differStyleMap } from './differ-style-map';
import { ISubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';

export type IDynamicStyleListValue = IExtractStylesFromAny;

export function setReactiveStyleList(
  subscribe: ISubscribeFunction<IDynamicStyleListValue>,
  element: HTMLElement,
): void {
  let previousStyles = new Map<string, string>();

  subscribeOnNodeConnectedTo(element, subscribe, (value: IDynamicStyleListValue) => {
    const styles: Map<string, string> = extractStylesFromAny(value);
    const nextStyles: [string, string][] = differStyleMap(previousStyles, styles);

    const iterator: IterableIterator<string> = previousStyles.values();
    let result: IteratorResult<string>;
    while (!(result = iterator.next()).done) {
      element.style.removeProperty(result.value);
    }

    for (let i = 0, l = nextStyles.length; i < l; i++) {
      const style: [string, string] = nextStyles[i];
      element.style.setProperty(style[0], style[1]);
    }

    previousStyles = styles;
  });
}

