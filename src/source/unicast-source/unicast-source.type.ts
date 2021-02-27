import { ISource } from '../source.type';
import { IEmitFunction } from '../../types/emit-function/emit-function.type';


/**
 * A UnicastSource is used to emit one value up to one observer
 * - emit: sends a value to the observer
 * - subscribe: register an observer for this source (max one or throw=
 */
export interface IUnicastSource<GValue> extends ISource<GValue> {
  getObserver(): IEmitFunction<GValue> | null;
}

/* derived */

export type IGenericUnicastSource = IUnicastSource<any>;

