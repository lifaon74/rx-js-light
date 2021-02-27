import { ISubscribePipeFunction } from '../../../../types/subscribe-pipe-function/subscribe-pipe-function.type';
import { ISubscribeFunction, IUnsubscribeFunction } from '../../../../types/subscribe-function/subscribe-function.type';
import { IEmitFunction } from '../../../../types/emit-function/emit-function.type';
import { ISource } from '../../../../source/source.type';

export interface ISourceSubscribePipeGetSource<GValue> {
  (): ISource<GValue>;
}

export function sourceSubscribePipe<GValue>(
  getSource: ISourceSubscribePipeGetSource<GValue>,
): ISubscribePipeFunction<GValue, GValue> {
  return (subscribe: ISubscribeFunction<GValue>): ISubscribeFunction<GValue> => {
    let unsubscribe: IUnsubscribeFunction;
    let observersCounts: number = 0;
    const source: ISource<GValue> = getSource();
    return (emit: IEmitFunction<GValue>): IUnsubscribeFunction => {
      let running: boolean = true;
      observersCounts++;
      const unsubscribeSource: IUnsubscribeFunction = source.subscribe(emit);
      if (observersCounts === 1) {
        unsubscribe = subscribe((value: GValue) => {
          source.emit(value);
        });
      }
      return () => {
        if (running) {
          running = false;
          unsubscribeSource();
          observersCounts--;
          if (observersCounts === 0) {
            unsubscribe();
          }
        }
      };
    };
  };
}
