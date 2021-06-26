import { IEmitFunction, ISubscribeFunction, ISubscribePipeFunction, IUnsubscribeFunction } from '../../../../types';
import { createTimeout, IAbortTimer } from '../../../../misc';


// export function bufferTimeSubscribePipe<GValue>(
//   duration: number,
// ): ISubscribePipeFunction<GValue, GValue[]> {
//   return bufferSubscribePipe<GValue>(interval(duration));
// }


export function bufferTimeSubscribePipe<GValue>(
  duration: number,
): ISubscribePipeFunction<GValue, GValue[]> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue[]> => {
    return (emit: IEmitFunction<GValue[]>): IUnsubscribeFunction => {
      let currentBuffer: GValue[] = [];
      let abortTimeout: IAbortTimer | null = null;

      const unsubscribe: IUnsubscribeFunction = subscribe((value: GValue): void => {
        currentBuffer.push(value);
        if (abortTimeout === null) {
          abortTimeout = createTimeout(() => {
            abortTimeout = null;
            const buffer: GValue[] = currentBuffer;
            currentBuffer = [];
            emit(buffer);
          }, duration);
        }
      });

      return (): void => {
        unsubscribe();
        if (abortTimeout !== null) {
          abortTimeout();
        }
      };
    };
  };
}



