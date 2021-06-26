import { ISubscribePipeFunction } from '../../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { IAbortTimer } from '../../../../misc/timer/abort-timer.type';
import { createTimeout } from '../../../../misc/timer/create-timeout';


export function debounceTimeSubscribePipe<GValue>(
  duration: number,
): ISubscribePipeFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      let abortTimeout: IAbortTimer | null = null;

      const unsubscribe: IUnsubscribeFunction = subscribe((value: GValue): void => {
        if (abortTimeout !== null) {
          abortTimeout();
        }
        abortTimeout = createTimeout(() => {
          abortTimeout = null;
          emit(value);
        }, duration);
      });

      return (): void => {
        unsubscribe();
        if (abortTimeout !== null) {
          abortTimeout();
        }
      };
    };
  };
}

