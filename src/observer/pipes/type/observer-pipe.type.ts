import { IObserver } from '../../type/observer.type';

/**
 * Receives data, performs some operation on it, and may emits same or other data
 * => PUSH destination (return) and PUSH source (emit)
 */
export interface IObserverPipe<GIn, GOut> {
  (emit: IObserver<GOut>): IObserver<GIn>;
}

/* derived */

export type IGenericObserverPipe = IObserverPipe<any, any>;

export type IInferObserverPipeGIn<GObserver extends IGenericObserverPipe> =
  GObserver extends IObserverPipe<infer GIn, any>
    ? GIn
    : never;

export type IInferObserverPipeGOut<GObserver extends IGenericObserverPipe> =
  GObserver extends IObserverPipe<any, infer GOut>
    ? GOut
    : never;
