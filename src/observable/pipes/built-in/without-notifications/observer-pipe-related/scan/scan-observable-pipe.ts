import { IScanFunction } from '../../../../../../observer/pipes/built-in/scan/scan-function.type';
import { IObservable } from '../../../../../type/observable.type';
import { IObservablePipe } from '../../../../type/observable-pipe.type';
import { scanObservable } from './scan-observable';

export function scanObservablePipe<GIn, GOut>(
  scanFunction: IScanFunction<GIn, GOut>,
  initialValue: GOut,
): IObservablePipe<GIn, GOut> {
  return (subscribe: IObservable<GIn>): IObservable<GOut> => {
    return scanObservable<GIn, GOut>(subscribe, scanFunction, initialValue);
  };
}
