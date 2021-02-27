import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../types/subscribe-function/subscribe-function.type';
import { IEmitFunction } from '../../../types/emit-function/emit-function.type';
import { IAbortTimer } from '../../../misc/timer/abort-timer.type';
import { createAnimationFrame } from '../../../misc/timer/create-animation-frame';


export function debounceFrameSubscribePipe<GValue>(): ISubscribePipeFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      let abort: IAbortTimer | null = null;
      return subscribe((value: GValue): void => {
        if (abort !== null) {
          abort();
        }
        abort = createAnimationFrame(() => {
          abort = null;
          emit(value);
        });
      });
    };
  };
}
