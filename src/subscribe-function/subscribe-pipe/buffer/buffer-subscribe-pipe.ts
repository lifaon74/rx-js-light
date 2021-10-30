import { IEmitFunction } from '../../../types/emit-function/emit-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../types/subscribe-function/subscribe-function.type';
import { ISubscribePipeFunction } from '../../../types/subscribe-pipe-function/subscribe-pipe-function.type';

export function bufferSubscribePipe<GValue>(
  closingSubscribeFunction: ISubscribeFunction<any>,
): ISubscribePipeFunction<GValue, GValue[]> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue[]> => {
    return (emit: IEmitFunction<GValue[]>): IUnsubscribeFunction => {
      let currentBuffer: GValue[] = [];

      const unsubscribeOfClosingSubscribeFunction: IUnsubscribeFunction = closingSubscribeFunction(() => {
        const buffer: GValue[] = currentBuffer;
        currentBuffer = [];
        emit(buffer);
      });

      const unsubscribeOfSourceSubscribeFunction: IUnsubscribeFunction = subscribe((value: GValue): void => {
        currentBuffer.push(value);
      });

      return (): void => {
        unsubscribeOfClosingSubscribeFunction();
        unsubscribeOfSourceSubscribeFunction();
      };
    };
  };
}
