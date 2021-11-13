import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';
import { createIdle, IdleDeadline, IdleRequestOptions } from '../../../../../../misc/timer/create-idle';
import { IAbortTimer } from '../../../../../../misc/timer/abort-timer.type';

/**
 * Creates an Observable that emits when idle time is available.
 */
export function idle(
  options?: IdleRequestOptions,
): IObservable<IdleDeadline> {
  return (emit: IObserver<IdleDeadline>): IUnsubscribe => {
    let running: boolean = true;
    let abort: IAbortTimer;
    const loop = (): void => {
      abort = createIdle((deadline: IdleDeadline): void => {
        emit(deadline);
        if (running) {
          loop();
        }
      }, options);
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
