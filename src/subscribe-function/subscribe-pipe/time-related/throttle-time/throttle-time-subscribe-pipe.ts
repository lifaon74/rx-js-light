import { IAbortTimer } from '../../../../misc/timer/abort-timer.type';
import { createTimeout } from '../../../../misc/timer/create-timeout';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { ISubscribePipeFunction } from '../../../../types/subscribe-pipe-function/subscribe-pipe-function.type';

export interface IThrottleTimeSubscribePipeOptions {
  leading?: boolean; // (default: true)
  trailing?: boolean; // (default: true)
}

export function throttleTimeSubscribePipe<GValue>(
  duration: number,
  {
    leading = true,
    trailing = true,
  }: IThrottleTimeSubscribePipeOptions,
): ISubscribePipeFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {

      let lastSendValueTime: number = leading
        ? Number.NEGATIVE_INFINITY
        : Number.POSITIVE_INFINITY;

      let abortTimeout: IAbortTimer | null = null;
      let trailingValue: GValue;

      const _emit = (value: GValue): void => {
        lastSendValueTime = Date.now();
        emit(value);
      };

      const unsubscribe: IUnsubscribeFunction = subscribe((value: GValue): void => {
        const elapsedTime: number = Math.max(0, Date.now() - lastSendValueTime);
        if (elapsedTime >= duration) {
          if (abortTimeout !== null) {
            abortTimeout();
            abortTimeout = null;
          }
          _emit(value);
        } else if (trailing) {
          trailingValue = value;
          if (abortTimeout === null) {
            abortTimeout = createTimeout(() => {
              abortTimeout = null;
              _emit(trailingValue);
            }, duration - elapsedTime);
          }
        }
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

// export function throttleTimeSubscribePipe<GValue>(
//   duration: number,
//   {
//     leading = true,
//     trailing = true,
//   }: IThrottleTimeSubscribePipeOptions,
// ): ISubscribePipeFunction<GValue, GValue> {
//   return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
//     return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
//       let abortTimeout: IAbortTimer | null = null;
//       let previousValue: GValue;
//       let hasValue: boolean = false;
//
//       const _emit = (value: GValue): void => {
//         if (abortTimeout === null) {
//           emit(value);
//           hasValue = false;
//           abortTimeout = createTimeout(() => {
//             abortTimeout = null;
//             if (hasValue) {
//               _emit(previousValue);
//             }
//           }, duration);
//         } else {
//           hasValue = true;
//           previousValue = value;
//         }
//       };
//
//       const unsubscribe: IUnsubscribeFunction = subscribe(_emit);
//
//       return (): void => {
//         unsubscribe();
//         if (abortTimeout !== null) {
//           abortTimeout();
//         }
//       };
//     };
//   };
// }
