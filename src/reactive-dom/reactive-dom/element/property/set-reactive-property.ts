import { subscribeOnNodeConnectedTo } from '../../../misc/subscribe-on-node-connected-to';
import { searchCaseInsensitiveProperty } from './search-case-insensitive-property';
import { ISubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';

export function setReactiveProperty(
  subscribe: ISubscribeFunction<any>,
  node: Node,
  name: string,
): void {
  subscribeOnNodeConnectedTo(node, subscribe, (value: any) => {
    node[name] = value;
  });
}

export function setCaseInsensitiveReactiveProperty(
  subscribe: ISubscribeFunction<any>,
  node: Node,
  name: string,
): void {
  const _name: string | null = searchCaseInsensitiveProperty(name, node);
  if (_name === null) {
    console.warn(node);
    throw new Error(`Missing property '${ name }'`);
  }
  return setReactiveProperty(
    subscribe,
    node,
    _name,
  );
}
