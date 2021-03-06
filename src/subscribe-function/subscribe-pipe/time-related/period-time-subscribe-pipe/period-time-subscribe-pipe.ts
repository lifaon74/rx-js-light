import { IEmitFunction, ISubscribeFunction, ISubscribePipeFunction, IUnsubscribeFunction } from '../../../../types';
import { IAbortTimer } from '../../../../misc/timer/abort-timer.type';
import { createTimeout } from '../../../../misc/timer/create-timeout';

export function periodTimeSubscribePipe<GValue>(
  duration: number,
): ISubscribePipeFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      let abort: IAbortTimer | null = null;
      let previousValue: GValue;
      let hasValue: boolean = false;

      const _emit = (value: GValue): void => {
        if (abort === null) {
          emit(value);
          hasValue = false;
          abort = createTimeout(() => {
            abort = null;
            if (hasValue) {
              _emit(previousValue);
            }
          }, duration);
        } else {
          hasValue = true;
          previousValue = value;
        }
      };

      return subscribe(_emit);
    };
  };
}
