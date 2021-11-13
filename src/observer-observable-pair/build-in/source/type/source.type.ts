import { IObserverObservablePair } from '../../../type/observer-observable-pair.type';

/**
 * A Source does the link between an Observer and Observable
 * 'emit' and 'subscribe' are tied together
 */
export type ISource<GValue> = IObserverObservablePair<GValue, GValue>;

/* derived */

export type IGenericSource = ISource<any>;

