import { ISubscribePipeFunction } from '../../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { IAbortTimer } from '../../../../misc/timer/abort-timer.type';
import { createAnimationFrame } from '../../../../misc/timer/create-animation-frame';

export function debounceFrameSubscribePipe<GValue>(): ISubscribePipeFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      let abortAnimationFrame: IAbortTimer | null = null;

      const unsubscribe: IUnsubscribeFunction = subscribe((value: GValue): void => {
        if (abortAnimationFrame !== null) {
          abortAnimationFrame();
        }
        abortAnimationFrame = createAnimationFrame(() => {
          abortAnimationFrame = null;
          emit(value);
        });
      });

      return (): void => {
        unsubscribe();
        if (abortAnimationFrame !== null) {
          abortAnimationFrame();
        }
      };
    };
  };
}
