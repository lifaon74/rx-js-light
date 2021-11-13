import { IScanFunction } from '../../../../../../observer/pipes/built-in/scan/scan-function.type';
import { scanObserverPipe } from '../../../../../../observer/pipes/built-in/scan/scan-observer-pipe';
import { IObservable } from '../../../../../type/observable.type';
import { transformObservableWithObserverPipe } from '../helpers/transform-observable-with-observer-pipe';

/**
 * @see scanObserverPipe
 */
export function scanObservable<GIn, GOut>(
  subscribe: IObservable<GIn>,
  scanFunction: IScanFunction<GIn, GOut>,
  initialValue: GOut,
): IObservable<GOut> {
  return transformObservableWithObserverPipe<GIn, GOut>(subscribe, scanObserverPipe<GIn, GOut>(scanFunction, initialValue));
}
