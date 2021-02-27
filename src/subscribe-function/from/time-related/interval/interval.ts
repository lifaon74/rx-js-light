
import { createInterval } from '../../../../misc/timer/create-interval';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';


/**
 * Creates a SubscribeFunction that emits no value (void) every specified interval of time.
 */
export function interval(
  period: number,
): ISubscribeFunction<void> {
  return (emit: IEmitFunction<void>): IUnsubscribeFunction => {
    return createInterval(emit, period);
  };
}
