import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';


export interface IDefferFactoryFunction<GValue> {
  (): ISubscribeFunction<GValue>;
}

export function defer<GValue>(
  factory: IDefferFactoryFunction<GValue>,
): ISubscribeFunction<GValue> {
  return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
    return factory()(emit);
  };
}


