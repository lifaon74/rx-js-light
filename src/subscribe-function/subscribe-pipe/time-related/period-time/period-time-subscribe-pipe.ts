import { IEmitFunction, ISubscribeFunction, ISubscribePipeFunction, IUnsubscribeFunction } from '../../../../types';
import { IAbortTimer } from '../../../../misc/timer/abort-timer.type';
import { createTimeout } from '../../../../misc/timer/create-timeout';

export function periodTimeSubscribePipe<GValue>(
  duration: number,
): ISubscribePipeFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      let abortTimeout: IAbortTimer | null = null;
      let previousValue: GValue;
      let hasValue: boolean = false;

      const _emit = (value: GValue): void => {
        if (abortTimeout === null) {
          emit(value);
          hasValue = false;
          abortTimeout = createTimeout(() => {
            abortTimeout = null;
            if (hasValue) {
              _emit(previousValue);
            }
          }, duration);
        } else {
          hasValue = true;
          previousValue = value;
        }
      };

      const unsubscribe: IUnsubscribeFunction = subscribe(_emit);

      return (): void => {
        unsubscribe();
        if (abortTimeout !== null) {
          abortTimeout();
        }
      };
    };
  };
}
