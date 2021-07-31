import { createAnimationFrameLoop } from '../../../../misc';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';

export function fromAnimationFrame(): ISubscribeFunction<void> {
  return (emit: IEmitFunction<void>): IUnsubscribeFunction => {
    return createAnimationFrameLoop(emit);
  };
}
