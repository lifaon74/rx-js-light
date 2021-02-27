import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { extractClassNamesFromAny, IExtractClassNamesFromAny } from './extract-class-names';
import { differClassNames } from './differ-class-names';
import { ISubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';

export type IReactiveClassListValue = IExtractClassNamesFromAny;


export function setReactiveClassList(
  subscribe: ISubscribeFunction<IReactiveClassListValue>,
  element: Element,
): void {
  let previousClassNames: Set<string> = new Set<string>();

  subscribeOnNodeConnectedTo(element, subscribe, (value: IReactiveClassListValue) => {
    const classNames: Set<string> = extractClassNamesFromAny(value);
    const nextClassNames: string[] = differClassNames(previousClassNames, classNames);

    const iterator: IterableIterator<string> = previousClassNames.values();
    let result: IteratorResult<string>;
    while (!(result = iterator.next()).done) {
      element.classList.remove(result.value);
    }

    for (let i = 0, l = nextClassNames.length; i < l; i++) {
      element.classList.add(nextClassNames[i]);
    }

    previousClassNames = classNames;
  });
}

