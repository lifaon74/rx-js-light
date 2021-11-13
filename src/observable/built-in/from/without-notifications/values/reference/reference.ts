import { noop } from '../../../../../../misc/helpers/noop';
import { IObserver } from '../../../../../../observer/type/observer.type';
import { IObservable, IUnsubscribe } from '../../../../../type/observable.type';

export interface IGetReferenceValue<GValue> {
  (): GValue;
}

export function reference<GValue>(
  getValue: IGetReferenceValue<GValue>,
): IObservable<GValue> {
  return (emit: IObserver<GValue>): IUnsubscribe => {
    emit(getValue());
    return noop;
  };
}
