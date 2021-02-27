import { ISubscribePipeFunction } from '../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../types/subscribe-function/subscribe-function.type';
import { IEmitFunction } from '../../types/emit-function/emit-function.type';


export function logStateSubscribePipe<GValue>(
  name: string,
): ISubscribePipeFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      console.log(`${ name } -> subscribe`);
      const unsubscribe: IUnsubscribeFunction = subscribe(emit);
      return () => {
        console.log(`${ name } -> unsubscribe`);
        unsubscribe();
      };
    };
  };
}

