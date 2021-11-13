import { IObserver } from '../../../type/observer.type';
import { IObserverPipe } from '../../type/observer-pipe.type';
import { IScanFunction } from './scan-function.type';
import { scanObserver } from './scan-observer';

export function scanObserverPipe<GIn, GOut>(
  scanFunction: IScanFunction<GIn, GOut>,
  initialValue: GOut,
): IObserverPipe<GIn, GOut> {
  return (emit: IObserver<GOut>): IObserver<GIn> => {
    return scanObserver<GIn, GOut>(emit, scanFunction, initialValue);
  };
}
