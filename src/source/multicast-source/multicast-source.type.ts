import { ISource } from '../source.type';
import { IEmitFunction } from '../../types/emit-function/emit-function.type';


/**
 * A MulticastSource is used to emit one value to multiple observers
 * - emit: sends a value to all the observers
 * - subscribe: registers an observer for this source
 */
export interface IMulticastSource<GValue> extends ISource<GValue> {
  getObservers(): readonly IEmitFunction<GValue>[]; // readonly list of observers for this source
}

/* derived */

export type IGenericMulticastSource = IMulticastSource<any>;

