import { ISource } from '../../type/source.type';
import { IObserver } from '../../../../../observer/type/observer.type';

/**
 * A MulticastSource is used to emit one value to multiple Observers
 * - emit: sends a value to all the Observers
 * - subscribe: registers an Observer for this Source
 */
export interface IMulticastSource<GValue> extends ISource<GValue> {
  getObservers(): readonly IObserver<GValue>[]; // readonly list of observers for this source
}

/* derived */

export type IGenericMulticastSource = IMulticastSource<any>;

