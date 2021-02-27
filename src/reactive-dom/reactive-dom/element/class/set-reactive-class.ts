import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { ISubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';


export function setReactiveClass(
  subscribe: ISubscribeFunction<boolean>,
  element: Element,
  name: string,
): void {
  subscribeOnNodeConnectedTo(element, subscribe, (value: boolean) => {
    element.classList.toggle(name, value);
  });
}

