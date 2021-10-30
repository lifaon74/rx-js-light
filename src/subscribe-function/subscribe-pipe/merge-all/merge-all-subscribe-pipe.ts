import { verifyNumberInRange } from '../../../misc/errors/range-error/verify-number-in-range';
import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../types/subscribe-function/subscribe-function.type';
import { IEmitFunction } from '../../../types/emit-function/emit-function.type';

export function mergeAllSubscribePipe<GValue>(
  maxNumberOfSubscriptions: number = Number.POSITIVE_INFINITY,
): ISubscribePipeFunction<ISubscribeFunction<GValue>, GValue> {
  verifyNumberInRange(maxNumberOfSubscriptions, 'maxNumberOfSubscriptions', { min: 1 });
  return (subscribe: ISubscribeFunction<ISubscribeFunction<GValue>>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      let running: boolean = true;
      const childrenUnsubscribeFunctions: IUnsubscribeFunction[] = [];
      const unsubscribe = subscribe((childSubscribe: ISubscribeFunction<GValue>): void => {
        if (childrenUnsubscribeFunctions.length >= maxNumberOfSubscriptions) {
          (childrenUnsubscribeFunctions.shift() as IUnsubscribeFunction)();
        }
        childrenUnsubscribeFunctions.push(childSubscribe(emit));
      });
      return () => {
        if (running) {
          running = false;
          unsubscribe();
          for (let i = 0, l = childrenUnsubscribeFunctions.length; i < l; i++) {
            childrenUnsubscribeFunctions[i]();
          }
        }
      };
    };
  };
}




