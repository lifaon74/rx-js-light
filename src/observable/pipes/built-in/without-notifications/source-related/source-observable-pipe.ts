import { ISource } from '../../../../../observer-observable-pair/build-in/source/type/source.type';
import { IObserver } from '../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../type/observable.type';
import { IObservablePipe } from '../../../type/observable-pipe.type';
import { ISourceObservablePipeGetSource } from './source-observable-pipe-get-source.type';

export function sourceObservablePipe<GValue>(
  getSource: ISourceObservablePipeGetSource<GValue>,
): IObservablePipe<GValue, GValue> {
  return (subscribe: IObservable<GValue>): IObservable<GValue> => {
    let unsubscribe: IUnsubscribe;
    let observersCounts: number = 0;
    const source: ISource<GValue> = getSource();
    return (emit: IObserver<GValue>): IUnsubscribe => {
      let running: boolean = true;
      observersCounts++;
      const unsubscribeSource: IUnsubscribe = source.subscribe(emit);
      if (observersCounts === 1) {
        unsubscribe = subscribe((value: GValue): void => {
          source.emit(value);
        });
      }
      return (): void => {
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
