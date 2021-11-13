import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { throttleTimeObservable } from './throttle-time-observable';
import { IThrottleTimeObservablePipeOptions } from './throttle-time-observable-pipe-options.type';

export function throttleTimeObservablePipe<GValue>(
  duration: number,
  options?: IThrottleTimeObservablePipeOptions,
): IObservablePipe<GValue, GValue> {
  return (subscribe: IObservable<GValue>): IObservable<GValue> => {
    return throttleTimeObservable<GValue>(subscribe, duration, options);
  };
}

// export function throttleTimeObservablePipe<GValue>(
//   duration: number,
//   {
//     leading = true,
//     trailing = true,
//   }: IThrottleTimeObservablePipeOptions,
// ): IObservablePipe<GValue, GValue> {
//   return (subscribe: IObservable<GValue>): IObservable<GValue> => {
//     return (emit: IObserver<GValue>): IUnsubscribe => {
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
//       const unsubscribe: IUnsubscribe = subscribe(_emit);
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
