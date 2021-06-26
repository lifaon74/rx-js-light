import { IEmitFunction, ISubscribeFunction, ISubscribePipeFunction, IUnsubscribeFunction } from '../../../types';


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
