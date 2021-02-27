import { IEmitFunction, ISubscribeFunction, ISubscribePipeFunction, IUnsubscribeFunction } from '../../../types';

export function conditionalSubscribePipe<GValue>(
  condition: ISubscribeFunction<boolean>,
): ISubscribePipeFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      let running: boolean = true;
      let unsubscribe: IUnsubscribeFunction | null = null;

      const _unsubscribe = () => {
        if (unsubscribe !== null) {
          unsubscribe();
          unsubscribe = null;
        }
      };

      const unsubscribeOfCondition: IUnsubscribeFunction = condition((value: boolean) => {
        _unsubscribe();
        if (value && running) {
          unsubscribe = subscribe(emit);
        }
      });

      return (): void => {
        if (running) {
          running = false;
          unsubscribeOfCondition();
          _unsubscribe();
        }
      };
    };
  };
}
