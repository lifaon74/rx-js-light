import { createMulticastReplayLastSource, IMulticastReplayLastSource } from '../../source';

export { of } from '../../subscribe-function/from/others/of/of';
export { reactiveFunction as func } from '../../subscribe-function/from/many/reactive-function/reactive-function';


export { of as const$$ } from '../../subscribe-function/from/others/of/of';
export { reactiveFunction as function$$ } from '../../subscribe-function/from/many/reactive-function/reactive-function';

export function let$$<GValue>(
  initialValue?: GValue
): IMulticastReplayLastSource<GValue> {
  return createMulticastReplayLastSource((arguments.length === 0) ? {} : { initialValue });
}
