import { createAnimationFrameLoop } from '../../../../misc/timer/create-animation-frame-loop';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';

export function fromAnimationFrame(): ISubscribeFunction<void> {
  return (emit: IEmitFunction<void>): IUnsubscribeFunction => {
    return createAnimationFrameLoop(emit);
  };
}
