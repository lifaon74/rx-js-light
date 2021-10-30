import { IAbortTimer } from '../../../../misc/timer/abort-timer.type';
import { createImmediate } from '../../../../misc/timer/create-immediate';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { ISubscribePipeFunction } from '../../../../types/subscribe-pipe-function/subscribe-pipe-function.type';

export function debounceImmediateSubscribePipe<GValue>(): ISubscribePipeFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      let abortTimeout: IAbortTimer | null = null;

      const unsubscribe: IUnsubscribeFunction = subscribe((value: GValue): void => {
        if (abortTimeout !== null) {
          abortTimeout();
        }
        abortTimeout = createImmediate(() => {
          abortTimeout = null;
          emit(value);
        });
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

