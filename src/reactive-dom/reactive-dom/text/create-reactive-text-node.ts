import { subscribeOnNodeConnectedTo } from '../../misc/subscribe-on-node-connected-to';
import { ISubscribeFunction } from '../../../types/subscribe-function/subscribe-function.type';


export function createReactiveTextNode(
  subscribe: ISubscribeFunction<string>,
): Text {
  const textNode: Text = new Text();

  subscribeOnNodeConnectedTo<string>(textNode, subscribe, (value: string) => {
    textNode.data = value;
  });

  return textNode;
}

