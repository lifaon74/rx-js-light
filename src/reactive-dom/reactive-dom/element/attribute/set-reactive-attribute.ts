import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { setAttributeValueWithEvent } from '../../../light-dom/attribute/with-event/set-attribute-value-with-event';
import { ISubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { IAttributeValue } from '../../../light-dom/attribute/set-attribute-value';

export type IReactiveAttributeValue = IAttributeValue;

export function setReactiveAttribute(
  subscribe: ISubscribeFunction<IReactiveAttributeValue>,
  element: Element,
  name: string,
): void {
  subscribeOnNodeConnectedTo(element, subscribe, (value: IReactiveAttributeValue) => {
    setAttributeValueWithEvent(element, name, value);
  });
}

