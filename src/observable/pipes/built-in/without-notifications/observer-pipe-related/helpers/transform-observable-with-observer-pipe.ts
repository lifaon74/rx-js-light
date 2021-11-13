import { IObserverPipe } from '../../../../../../observer/pipes/type/observer-pipe.type';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function transformObservableWithObserverPipe<GIn, GOut>(
  subscribe: IObservable<GIn>,
  observerPipe: IObserverPipe<GIn, GOut>,
): IObservable<GOut> {
  return (emit: IObserver<GOut>): IUnsubscribe => {
    return subscribe(observerPipe(emit));
  };
}
