import { noop } from '../../../../../../misc/helpers/noop';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export function empty<GValue = any>(): IObservable<GValue> {
  return (): IUnsubscribe => {
    return noop;
  };
}
