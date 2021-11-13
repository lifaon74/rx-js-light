import { ISource } from '../../type/source.type';
import { IObserver } from '../../../../../observer/type/observer.type';

/**
 * A UnicastSource is used to emit one value up to one Observer
 * - emit: sends a value to the observer
 * - subscribe: register an Observer for this source (max one or throws)
 */
export interface IUnicastSource<GValue> extends ISource<GValue> {
  getObserver(): IObserver<GValue> | null;
}

/* derived */

export type IGenericUnicastSource = IUnicastSource<any>;

