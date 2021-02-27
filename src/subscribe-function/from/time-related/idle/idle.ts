import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { createIdle } from '../../../../misc/timer/create-idle';
import { IAbortTimer } from '../../../../misc/timer/abort-timer.type';


/**
 * Creates a SubscribeFunction that emits when idle time is available.
 */
export function idle(): ISubscribeFunction<IdleDeadline> {
  return (emit: IEmitFunction<IdleDeadline>): IUnsubscribeFunction => {
    let running: boolean = true;
    let abort: IAbortTimer;
    const loop = () => {
      abort = createIdle((deadline: IdleDeadline) => {
        emit(deadline);
        if (running) {
          loop();
        }
      });
    };
    loop();
    return (): void => {
      if (running) {
        running = false;
        abort();
      }
    };
  };
}
