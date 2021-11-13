import { IObserverPipe } from '../../../../../../observer/pipes/type/observer-pipe.type';
import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { transformObservableWithObserverPipe } from './transform-observable-with-observer-pipe';

/**
 * Converts an observer pipe to an observable pipe
 */
export function observerPipeToObservablePipe<GIn, GOut>(
  observerPipe: IObserverPipe<GIn, GOut>,
): IObservablePipe<GIn, GOut> {
  return (subscribe: IObservable<GIn>): IObservable<GOut> => {
    return transformObservableWithObserverPipe<GIn, GOut>(subscribe, observerPipe);
  };
}
