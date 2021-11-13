import { IObservable } from '../../type/observable.type';

/**
 * Receives data, performs some operation on it, and may emits same or other data
 * Similar to ObserverPipe but works with Observable instead
 * => Lazy loaded PUSH destination (return) and Lazy loaded PUSH source (subscribe)
 */
export interface IObservablePipe<GIn, GOut> {
  (subscribe: IObservable<GIn>): IObservable<GOut>;
}

/* derived */

export type IGenericObservablePipe = IObservablePipe<any, any>;
