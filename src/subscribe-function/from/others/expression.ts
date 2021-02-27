
import { idle } from '../time-related/idle/idle';
import { IEmitFunction } from '../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../types/subscribe-function/subscribe-function.type';


export interface IExpressionFunction<GValue> {
  (): GValue;
}

/**
 * Creates an Observable that runs 'callback' when idle time is available, and emit distinct returned values.
 */
export function expression<GValue>(
  callback: IExpressionFunction<GValue>,
  trigger: ISubscribeFunction<any> = idle(),
): ISubscribeFunction<GValue> {
  // return pipeSubscribeFunction(trigger, [
  //   mapOperator<void, GValue>(callback),
  //   distinctOperator<GValue>(),
  // ]);

  return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
    let previousValue: GValue;
    return trigger((): void => {
      const value: GValue = callback();
      if (value !== previousValue) {
        previousValue = value;
        emit(value);
      }
    });
  };
}


